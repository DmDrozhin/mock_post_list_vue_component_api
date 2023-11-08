<template>
  <transition name="modal" tag="div">
    <UIModalWind v-if="isModalShow">
      <div class="post-form-wrapper">
        <post-form
          @newPost="addNewPost($event)"
          @closeModal="isModalShow = false"
        ></post-form>
      </div>
    </UIModalWind>
  </transition>
  <div class="main-wrapper">
    <div class="main">
      <br />
      <div class="dash-brd-wrapper flex-jcsb">
        <div class="dash-brd-1 flex-jcl">
          <h2 class="dash-brd-1__title">POSTS</h2>
          <UICommonButton
            @buttonClick="isModalShow = !isModalShow"
            class="dash-brd-1__btn"
            >Create new post
          </UICommonButton>
          <UIAnimatedLoader
            v-if="isLoading"
            class="dash-brd-1__loader"
          ></UIAnimatedLoader>
        </div>
        <div class="dash-brd-2 flex-jcr">
          <UISearchInput
            v-model:search="searchTXT"
            class="dash-brd-2__search"
          />
          <UICustomSelect
            v-model:sortBy="sortBy"
            :options="optionsArr"
            :clickTarget="clickTargetClass"
            class="dash-brd-2__my-select"
          />
        </div>
      </div>
      <br />
      <div>
        <post-list
          v-if="!isLoading"
          :posts="filteredPostList"
          @deletePost="deletePost($event)"
        ></post-list>
      </div>
      <transition name="alert-msg">
        <h3 v-if="filteredPostList.length <= 0" id="alert-msg">
          There is no message to show
        </h3>
      </transition>
    </div>

    <div class="footer">
      <div>
        <UIPagePicker
          v-model:currentPage="postsCurrentPage"
          :totalPages="postsPagesQt"
        />
      </div>

      <div class="intersection" ref="intersection">
        <h1>intercepting block</h1>
        <div class="wrapper flex-jcl">
          <div class="intersection__arrow-icon">
            <UIArrowIcon :arrowDirection="'rotate(0)'" />
          </div>
          <p>scroll down to get the next page</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import axios from 'axios'

export default {
  components: { PostForm, PostList },
  name: 'MainPage',
  data() {
    return {
      title: 'Mock post-list',
      isModalShow: false,
      inactive: [
        { pointerEvents: 'none' },
        { overflow: 'hidden' },
        { cursor: 'not-allowed' },
      ],
      isLoading: true,
      sortBy: 'id',
      optionsArr: [
        { prop: 'title', name: 'By title' },
        { prop: 'id', name: 'By ID' },
        { prop: 'body', name: 'By body' },
      ],
      searchTXT: '',
      clickTargetClass: '',
      posts: [],
      postsTotalQt: null,
      postsPagesQt: null,
      postsCurrentPage: 1,
      postsPerPage: 20,
      postsNewPostCounter: null,
    }
  },
  watch: {
    postsCurrentPage() {
      this.fetchPosts()
    },
  },
  computed: {
    sortedPostList() {
      const option = this.sortBy
      const sortString = (a, b) => a[option].localeCompare(b[option])
      const sortNum = (a, b) => a[option] - b[option]
      const arr = [...this.posts]
      if (option === 'id') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return arr.sort(sortNum)
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return arr.sort(sortString)
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    filteredPostList() {
      const query = this.searchTXT.toLowerCase()
      if (query) {
        return this.sortedPostList.filter(post =>
          post.title.toLowerCase().includes(query)
        )
      } else return this.sortedPostList
    },
  },
  methods: {
    scrollNextPage() {
      if (this.postsCurrentPage < this.postsPagesQt) {
        this.postsCurrentPage += 1
      } else this.postsCurrentPage = 1
    },
    addNewPost(ev) {
      if (ev) {
        ++this.postsNewPostCounter
        ev.id = +this.postsTotalQt + this.postsNewPostCounter
        this.posts.push(ev)
      }
    },
    deletePost(post) {
      const conf = confirm('Do you really want to delete the post?')
      if (conf) {
        this.posts = this.posts.filter(p => p.id !== post.id)
      }
    },

    async fetchPosts() {
      try {
        this.isLoading = true
        setTimeout(async () => {
          const resp = await axios.get(
            `https://jsonplaceholder.typicode.com/posts`,
            {
              params: {
                _page: this.postsCurrentPage,
                _limit: this.postsPerPage,
              },
            }
          )
          this.postsTotalQt = resp.headers['x-total-count']
          this.postsPagesQt = Math.ceil(this.postsTotalQt / this.postsPerPage)
          this.posts = resp.data
          this.isLoading = false
        }, 1000)
      } catch (er) {
        throw new Error(`Fetching error: ${er}`)
      }
    },

    infiniteScroll() {
      const options = { rootMargin: '0px', threshold: 1.0 }
      const target = this.$refs.intersection
      const callback = entries => {
        setTimeout(() => {
          if (entries[0].isIntersecting) {
            console.log('Crossed')
            this.scrollNextPage()
          }
        }, 500)
      }
      const observer = new IntersectionObserver(callback, options)
      observer.observe(target)
    },
  },

  mounted() {
    this.fetchPosts()
    this.infiniteScroll()
  },
}
</script>

<style scoped>
@import '@/styles/style.css';
.main-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

footer {
  flex: 0 0 auto;
}

h3#alert-msg {
  color: coral;
  text-align: center;
  margin-top: 2rem;
}
.dash-brd-1 {
  flex: 1 0 50%;
}
.dash-brd-1__title {
  flex: 0 0 150px;
}
.dash-brd-1__btn {
  flex: 0 0 180px;
}
.dash-brd-1__loader {
  flex: 1 0 auto;
  margin-left: 2rem;
}
.dash-brd-2 {
  flex: 1 0 auto;
  gap: 2rem;
}
.dash-brd-2__search {
  flex: 1 1 auto;
}
.dash-brd-2__my-select {
  flex: 1 0 40%;
}
.post-form-wrapper {
  /* position: fixed; */
  z-index: 99;
  pointer-events: all;
  margin: 0 auto;
  margin-top: 20%;
  width: fit-content;
}
/* .modal {
  display: inline-block;
  margin-right: 10px;
} */
.alert-msg-enter-active,
.alert-msg-leave-active,
.modal-enter-active,
.modal-leave-active {
  transition: transform 0.5s ease;
}
.alert-msg-enter-from,
.alert-msg-leave-to,
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.alert-msg-move,
.modal-move {
  transition: transform 0.5sec ease;
}
footer {
  margin-top: 1rem;
}
.intersection {
  height: 10rem;
  background-color: #7b6767;
  display: grid;
  place-content: center;
  margin-top: 1rem;
}
.intersection__arrow-icon {
  display: inline-block;
  margin-right: 1rem;
  z-index: 1;
}
</style>

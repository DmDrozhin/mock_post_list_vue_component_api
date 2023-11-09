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
      <!-- ALERT MESSAGE -->
      <transition-group name="message" tag="div">
        <div class="alert-message-wrapper" :key="Date()">
          <h3
            v-if="!isLoading && filteredPostList.length <= 0"
            class="alert-message"
            :key="Date()"
          >
            There is no message to show
          </h3>
        </div>
      </transition-group>

      <!-- POST LIST BLOCK -->
      <div v-if="filteredPostList.length > 0">
        <post-list
          v-if="!isLoading"
          :posts="filteredPostList"
          @deletePost="deletePost($event)"
        ></post-list>
      </div>
    </div>

    <div class="footer">
      <!-- PAGE PICKER -->
      <div>
        <UIPagePicker
          v-model:currentPage="postsCurrentPage"
          :totalPages="postsPagesQt"
        />
      </div>
      <!-- INTERSECTION BLOCK -->
      <div class="intersection" v-intersection="scrollNextPage">
        <h1>intercepting block</h1>
        <div class="wrapper flex-jcl">
          <div class="intersection__arrow-icon">
            <UIArrowIcon :direction="'rotate(0)'" :size="30" />
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
      postsPerPage: 10,
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
  },

  mounted() {
    this.fetchPosts()
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

/* MODAL BLOCK */
.modal-move {
  transition: transform 0.5sec ease;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* SLIDE MESSAGE */
.message-enter-active,
.message-leave-active {
  transition: opacity 0.3s linear;
}
.message-enter-from,
.message-leave-to {
  opacity: 0;
}
.message-enter-to,
.message-leave-from {
  opacity: 1;
}
.alert-message-wrapper {
  position: absolute;
  left: 50%;
}
.alert-message {
  position: relative;
  left: -50%;
  color: coral;
  transform: translateY(3rem);
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

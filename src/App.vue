<template>
  <div
    class="container"
    :class="{ inactive: isModalShow }"
    @click.capture="clickTarget = $event.target.className"
  >
    <h1>{{ title.toUpperCase() }}</h1>
    <div class="spacer"></div>
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
    <br />
    <div class="dash-brd-wrapper flex-jcsb">
      <div class="dash-brd-1 flex-jcl">
        <h2 class="dash-brd-1__title">POSTS</h2>
        <UICommonButton
          @click="isModalShow = !isModalShow"
          class="dash-brd-1__btn"
          >Create new post
        </UICommonButton>
        <UIAnimatedLoader
          v-if="isLoading"
          class="dash-brd-1__loader"
        ></UIAnimatedLoader>
      </div>
      <div class="dash-brd-2 flex-jcr">
        <UISearchInput v-model:search="searchTXT" class="dash-brd-2__search" />
        <UICustomSelect
          v-model:sortBy="sortBy"
          :options="optionsArr"
          :clickTarget="clickTarget"
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
    <div>
      <h3 v-if="posts.length <= 0" id="alert-msg">Post list is empty</h3>
    </div>
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue'
import PostList from './components/PostList.vue'
import axios from 'axios'

export default {
  components: { PostForm, PostList },
  name: 'App',
  data() {
    return {
      title: 'Mock post-list',
      isModalShow: false,
      inactive: [
        { pointerEvents: 'none' },
        { overflow: 'hidden' },
        { cursor: 'not-allowed' },
      ],
      posts: [],
      isLoading: true,
      sortBy: 'title',
      optionsArr: [
        { prop: 'title', name: 'By title' },
        { prop: 'id', name: 'By ID' },
        { prop: 'body', name: 'By body' },
      ],
      searchTXT: '',
      clickTarget: '',
    }
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
    addNewPost(ev) {
      if (ev) {
        ev.id = this.posts.length + 1
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
            'https://jsonplaceholder.typicode.com/posts?_limit=10'
          )
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
@import './styles/style.css';
h1 {
  position: relative;
  display: inline-block;
}
h1::after {
  content: '';
  display: block;
  position: absolute;
  right: -25px;
  top: 0;
  width: 15px;
  height: 100%;
  background-color: coral;
}
.container.inactive {
  pointer-events: none;
  overflow: hidden;
}
.spacer {
  margin: 1rem 0;
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
  position: fixed;
  z-index: 99;
  pointer-events: all;
  cursor: cross;
}
/* .modal {
  display: inline-block;
  margin-right: 10px;
} */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>

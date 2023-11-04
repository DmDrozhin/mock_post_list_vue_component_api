<template>
  <div class="container" :class="{ inactive: isModalShow }">
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
    <div class="handling-blocks-wrapper flex-jcsb">
      <div class="handling-block-1 flex-jcl">
        <h2 class="handling-block-1__title">POSTS</h2>
        <UICommonButton
          @click="isModalShow = !isModalShow"
          class="handling-block-1__btn"
          >Create new post
        </UICommonButton>
        <UIAnimatedLoader
          v-if="isLoading"
          class="handling-block-1__loader"
        ></UIAnimatedLoader>
      </div>
      <div class="handling-block-2 flex-jcr">
        <UISearchInput
          v-model:search="searchTXT"
          class="handling-block-2__search"
        />
        <UISelectOption
          v-model:selectedValue="selected"
          :options="optionsArr"
          class="handling-block-2__select"
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
      selected: 'title',
      optionsArr: [
        { prop: 'title', name: 'By title' },
        { prop: 'id', name: 'By ID' },
        { prop: 'body', name: 'By body' },
      ],
      searchTXT: '',
    }
  },
  computed: {
    sortedPostList() {
      const option = this.selected
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
.handling-block-1 {
  flex: 1 0 50%;
}
.handling-block-1__title {
  flex: 0 0 150px;
}
.handling-block-1__btn {
  flex: 0 0 180px;
}
.handling-block-1__loader {
  flex: 1 0 auto;
  margin-left: 2rem;
}
.handling-block-2 {
  flex: 1 0 auto;
  gap: 1rem;
}
.handling-block-2__search {
  flex: 0 0 60%;
}
.handling-block-2__select {
  flex: 1 0 auto;
  position: relative;
}
.handling-block-2__select:hover:after {
  content: '';
  display: block;
  position: absolute;
  width: 10px;
  height: 104%;
  top: -1px;
  right: 20px;
  background-color: coral;
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

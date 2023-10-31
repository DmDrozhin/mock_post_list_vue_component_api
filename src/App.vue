<template>
  <div class="container" :class="{ inactive: isShowModal }">
    <h1>{{ title }}</h1>
    <div class="spacer"></div>
    <transition tag="div" name="modal">
      <modal-wind v-if="isShowModal">
        <div class="post-form-wrapper">
          <post-form
            @newPost="addNewPost($event)"
            @closeModal="isShowModal = false"
          ></post-form>
        </div>
      </modal-wind>
    </transition>
    <br />
    <div class="flex-jcsb">
      <h2>POSTS</h2>
      <common-button @click="isShowModal = !isShowModal"
        >Create new post
      </common-button>
    </div>
    <br />
    <div>
      <post-list :posts="posts" @deletePost="deletePost($event)"></post-list>
    </div>
    <div>
      <h2 v-if="posts.length <= 0" id="alert-msg">The post list is empty</h2>
    </div>
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue'
import PostList from './components/PostList.vue'
import CommonButton from './components/UI/CommonButton.vue'
import ModalWind from './components/UI/ModalWind.vue'
export default {
  components: { PostForm, PostList, ModalWind, CommonButton },
  name: 'App',
  data() {
    return {
      title: 'Blog. Info posts',
      isShowModal: false,
      inactive: [
        { pointerEvents: 'none' },
        { overflow: 'hidden' },
        { cursor: 'not-allowed' },
      ],
      posts: [
        {
          id: 1,
          title: 'What is Lorem Ipsum?',
          body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        },
        {
          id: 2,
          title: 'Where does it come from?',
          body: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.',
        },
        {
          id: 3,
          title: 'Why do we use it?',
          body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        },
        {
          id: 4,
          title: 'Where can I get some?',
          body: "here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
        },
      ],
    }
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
.container {
  height: 100vh;
  padding: 1rem;
  max-width: 1280px;
  margin: 0 auto;
  background-color: var(--main-bg-color);
  /* background-color: #565656; */
  color: #fff;
}
.container.inactive {
  pointer-events: none;
  overflow: hidden;
}
.spacer {
  margin: 1rem 0;
}
h2#alert-msg {
  color: coral;
}
.flex-jcsb {
  max-width: 30vw;
}
.post-form-wrapper {
  position: fixed;
  z-index: 99;
  pointer-events: all;
  cursor: default;
}
.modal {
  /* display: inline-block; */
  /* margin-right: 10px; */
}
.modal-enter-active,
.modal-leave-active {
  transition: all 1s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  /* transform: translateY(30px); */
}
</style>

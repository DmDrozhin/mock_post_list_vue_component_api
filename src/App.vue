<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <hr />
    <post-form @newPost="addNewPost($event)"></post-form>
    <br />
    <hr />
    <h2>POSTS</h2>
    <br />
    <post-list :posts="posts" @deletePost="deletePost($event)"></post-list>
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue'
import PostList from './components/PostList.vue'
export default {
  components: { PostForm, PostList },
  name: 'App',
  data() {
    return {
      title: 'Blog. Info posts',
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
    deletePost(id) {
      const index = this.posts.findIndex(p => p.id === id)
      if (index !== -1) {
        this.posts.splice(index, 1)
      }
    },
  },
}
</script>

<style>
* {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* background-color: #b6b6b6; */
  /* min-height: 100vh; */
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

.container {
  height: 100vh;
  padding: 1rem;
  max-width: 1280px;
  margin: 0 auto;
  background-color: #565656;
  color: #fff;
}

h1 {
  font-size: 2.5rem;
  letter-spacing: 0.3rem;
}
h2 {
  font-size: 2rem;
  letter-spacing: 0.2rem;
}
</style>

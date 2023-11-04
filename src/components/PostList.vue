<template>
  <div>
    <div class="posts">
      <transition-group name="post-list">
        <PostItem
          class="posts"
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @deletePost="$emit('deletePost', post)"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import PostItem from './PostItem.vue'
export default {
  name: 'PostList',
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.posts {
  border: 1px solid #a2c0a7;
  border-bottom: none;
}
.posts:last-child {
  border-bottom: 1px solid #a2c0a7;
}
/* .post-list-item {
  display: inline-block;
  margin-right: 10px;
} */
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  /* opacity: 0; */
  transform: translateX(100%);
}
.post-list-move {
  transition: transform 0.5s ease;
}
</style>

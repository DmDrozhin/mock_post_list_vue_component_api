<template>
  <div>
    <div class="posts">
      <PostItem
        class="posts"
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @deletePost="$emit('deletePost', post)"
      />
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
</style>

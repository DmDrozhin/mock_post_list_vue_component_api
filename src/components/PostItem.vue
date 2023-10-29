<template>
  <div class="flex-block">
    <div class="post">
      <div>
        <strong>{{ post.title }}</strong>
      </div>
      <div>{{ post.body }}</div>
    </div>
    <div class="btn-wrapper">
      <DeleteButton @deleteItem="deletePost(post.id, post.title)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostItem',
  props: { post: { type: Object, required: true, default: () => {} } },
  data() {
    return {}
  },
  methods: {
    aksUser(title) {
      return confirm(`Do you want to delete the post: *** ${title} ***?`)
    },
    deletePost(id, title) {
      if (this.aksUser(title)) {
        this.$emit('deletePost', id)
        alert('The post has been deleted!')
      }
    },
  },
}
</script>

<style scoped>
.post {
  padding: 1rem;
  flex: 1 0 93%;
}
.flex-block {
  display: flex;
  justify-content: blex-between;
  align-items: center;
  gap: 1rem;
}
.btn-wrapper {
  flex: 1 0 auto;
}
</style>

<template>
  <div class="container">
    <h1>{{ title }} : {{ postId }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Single post',
    }
  },
  computed: {
    postId() {
      return this.$route.params.id
    },
  },
}
</script>

<style scoped></style>

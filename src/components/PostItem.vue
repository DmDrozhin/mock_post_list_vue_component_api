<template>
  <div class="post flex-jcsb">
    <div class="post__content">
      <div class="post__title-wrapper flex-jcl">
        <div class="post__id">{{ post.id }}</div>
        <div class="post__title">
          <strong>{{ post.title }}</strong>
        </div>
      </div>
      <div class="post__body">{{ post.body }}</div>
    </div>
    <div class="post__btn-wrapper">
      <UIDeleteButton @click.prevent.stop="$emit('deletePost')" />
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
  methods: {},
}
</script>

<style scoped>
@import '@/styles/style.css';
.post__content {
  padding: 1rem;
  flex: 1 0 93%;
}
.post__title-wrapper {
  gap: 1rem;
}
.post__id {
  background-color: var(--btn-bg-color-hover);
  padding: 0.2rem 0.7rem;
}
.post__btn-wrapper {
  flex: 1 0 auto;
}
</style>

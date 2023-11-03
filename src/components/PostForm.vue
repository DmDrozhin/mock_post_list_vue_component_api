<template>
  <div class="new-post">
    <UIDeleteButton @click="$emit('closeModal')" class="new-post__del-btn" />
    <h2>New post</h2>
    <div class="alert-div">
      <p class="alert-msg">{{ alertMessage }}</p>
    </div>
    <hr style="margin: 0 0 1rem 0" />
    <form class="new-post__post-form" @submit.prevent name="post-form">
      <UITextInput
        v-model:title="newPost.title"
        class="text-input"
        :label="'Post title'"
        :height="2.5"
        name="post-title"
      />
      <UITextArea
        v-model:body="newPost.body"
        class="text-area"
        :label="'Post message'"
        :rows="4"
        :cols="30"
        name="post-body"
      />

      <UICommonButton class="btn" @buttonAction="makeNewPost"
        >Create post</UICommonButton
      >
    </form>
  </div>
</template>

<script>
export default {
  name: 'PostForm',
  data() {
    return {
      newPost: { id: { type: Number, required: true }, title: '', body: '' },
      alertMessage: '',
    }
  },
  methods: {
    makeNewPost() {
      this.alertMessage = ''
      if (this.newPost.title && this.newPost.body) {
        this.$emit('newPost', this.newPost)
        this.newPost = { id: '', title: '', body: '' }
      } else {
        this.alertMessage = '! Please fill out text fields !'
        return
      }
    },
  },
}
</script>

<style scoped>
@import '@/styles/style.css';
.new-post {
  position: relative;
  border: 1px solid #fff;
  padding: 2rem;
  background-color: var(--main-bg-color);
}
.new-post__del-btn {
  position: absolute;
  right: 2rem;
  top: 2rem;
}
.alert-div {
  height: 2rem;
}
.alert-msg {
  color: var(--alert-txt-color);
  font-size: 1.2rem;
  font-weight: 600;
}
.new-post__post-form {
  display: flex;
  flex-direction: column;
  width: 25rem;
}
.text-input {
  margin-bottom: 1rem;
}
.btn {
  margin-top: 1rem;
  width: 10rem;
}
</style>

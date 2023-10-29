<template>
  <div>
    <div class="alert-div">
      <p class="alert-msg">{{ alertMessage }}</p>
    </div>
    <hr />
    <form class="post-form" @submit.prevent>
      <TextInput
        class="text-input"
        :label="'Post title'"
        :height="2.5"
        :clearForm="isTimeToClearFrom"
        @changed="newPost.title = $event"
        @filedCleared="isTimeToClearFrom = false"
      />
      <TextArea
        class="text-area"
        :label="'Post message'"
        :rows="4"
        :cols="50"
        :clearForm="isTimeToClearFrom"
        @changed="newPost.body = $event"
        @filedCleared="isTimeToClearFrom = false"
      />

      <CommonButton class="btn" @buttonAction="toNewPost"
        >Create post</CommonButton
      >
    </form>
  </div>
</template>

<script>
import TextInput from './UI/TextInput.vue'
export default {
  components: { TextInput },
  name: 'PostForm',
  data() {
    return {
      newPost: { id: '', title: '', body: '' },
      alertMessage: '',
      isTimeToClearFrom: false,
    }
  },
  methods: {
    toNewPost() {
      this.alertMessage = ''
      if (this.newPost.title && this.newPost.body) {
        this.$emit('newPost', this.newPost)
        this.newPost = { id: '', title: '', body: '' }
        this.isTimeToClearFrom = true
      } else {
        this.alertMessage = '! Please fill out text fields !'
        return
      }
    },
  },
}
</script>

<style scoped>
.alert-div {
  height: 2rem;
}
.alert-msg {
  color: rgb(255, 129, 154);
  font-size: 1.2rem;
  font-weight: 600;
}
.post-form {
  display: flex;
  flex-direction: column;
  max-width: 50%;
}
.text-input {
  margin-bottom: 1rem;
}
.btn {
  margin-top: 1rem;
  width: 10rem;
}
</style>

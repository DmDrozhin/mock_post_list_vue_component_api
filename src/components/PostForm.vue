<template>
  <div class="new-post">
    <!-- THE FROM HEADER -->
    <div class="new-post__header">
      <div class="new-post__title-block flex-jcl">
        <UIMainIcon :size="45" />
        <h2>{{ title }}</h2>
      </div>
      <UICloseButton
        @click.prevent.stop="hideModal"
        class="new-post__del-btn"
      />
    </div>

    <div class="alert-div">
      <p class="alert-msg">{{ alertMessage }}</p>
    </div>

    <hr style="margin: 0 0 1rem 0" />

    <!-- THE FORM -->
    <form class="new-post__post-form" @submit.prevent name="post-form">
      <UITextInput
        v-focus-element
        v-model:textInputValue="newPost.title"
        :label="'Post title'"
        class="text-input"
        @focused="alert(false)"
      />
      <UITextArea
        v-model:textAreaValue="newPost.body"
        :label="'Post message'"
        :rows="5"
        class="text-area"
        @focused="alert(false)"
      />

      <UICommonButton class="btn" @buttonClick="makeNewPost"
        >Create post</UICommonButton
      >
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PostForm',
  data() {
    return {
      title: 'New post',
      newPost: { id: { type: Number, required: true }, title: '', body: '' },
      alertMessage: '',
    }
  },
  computed: {
    ...mapGetters(['CLICKED_ELEMENT']),
  },
  watch: {
    CLICKED_ELEMENT(val) {
      if (val === 'modal-window') {
        this.hideModal()
      }
    },
  },
  methods: {
    hideModal() {
      this.$emit('closeModal')
    },
    alert(val) {
      val
        ? (this.alertMessage = 'Fill out both fields!')
        : (this.alertMessage = '')
    },
    emptyPost() {
      this.newPost = { id: '', title: '', body: '' }
    },
    makeNewPost() {
      this.alertMessage = ''
      if (this.newPost.title && this.newPost.body) {
        this.$emit('newPost', this.newPost)
        this.emptyPost()
      } else {
        this.alert(true)
        return
      }
    },
  },
}
</script>

<style scoped>
@import '@/styles/style.css';
.new-post {
  z-index: 100;
  position: relative;
  border: 1px solid #fff;
  padding: 2rem;
  background-color: var(--main-bg-color);
}
.new-post__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}
.new-post__title-block {
  gap: 1rem;
}
.alert-div {
  height: 2rem;
}
.alert-msg {
  color: var(--alert-txt-color);
  text-align: center;
  font-size: 1.2rem;
  letter-spacing: 1.5px;
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

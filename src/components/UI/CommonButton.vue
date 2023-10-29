<template>
  <div>
    <button class="btn-common" @click="toButtonAction()">
      <slot name="default"></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CommonButton',
  data() {
    return {}
  },
  methods: {
    toButtonAction() {
      this.$emit('buttonAction')
    },
  },
}
</script>

<style scoped>
.btn-common {
  appearance: none;
  background-color: #9d93e1;
  /* border: 0; */
  box-shadow: none;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  color: #fff;
  letter-spacing: 1.5px;
  width: 100%;
}
</style>

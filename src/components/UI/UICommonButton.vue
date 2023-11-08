<template>
  <div>
    <button class="btn-common" @click="handleClick()">
      <slot name="default"></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'UICommonButton',
  data() {
    return {}
  },
  methods: {
    handleClick() {
      this.$emit('buttonClick')
    },
  },
}
</script>

<style scoped>
.btn-common {
  background-color: var(--btn-bg-color);
  border-radius: 0.3rem;
  border: none;
  padding: 0.5rem 1rem;
  color: #fff;
  letter-spacing: 1.5px;
  width: 100%;
  transition: all 300ms ease-out;
  position: relative;
}
.btn-common:hover {
  background-color: var(--btn-bg-color-hover);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  cursor: pointer;
}
.btn-common:hover::after {
  position: absolute;
  display: block;
  right: -10px;
  top: 0;
  content: '';
  width: 9px;
  height: 100%;
  background-color: coral;
}
.btn-common:active::after {
  display: none;
}
</style>

<template>
  <div class="modal-window"><slot></slot></div>
</template>

<script>
export default {
  name: 'ModalWindow',
  data() {
    return {}
  },
}
</script>

<style scoped>
.modal-window {
  position: absolute;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #0000007d;
}
</style>

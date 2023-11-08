<template>
  <div class="modal-window"><slot></slot></div>
</template>

<script>
export default {
  name: 'UIModalWind',
  data() {
    return {}
  },
}
</script>

<style scoped>
.modal-window {
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0000007d;
  overflow: hidden;
}
</style>

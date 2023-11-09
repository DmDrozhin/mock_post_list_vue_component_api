<template>
  <div class="btn-close">
    <UICrossIcon :size="'30px'" />
  </div>
</template>

<script>
export default {
  name: 'UICloseButton',
  data() {
    return {}
  },
}
</script>

<style lang="css">
.btn-close {
  width: 1.7rem;
  height: 1.7rem;
  background-color: transparent;
  position: relative;
  cursor: pointer;
}
.btn-close:hover:after {
  content: '';
  display: block;
  position: absolute;
  top: 0px;
  right: -10px;
  width: 8px;
  height: calc(100% + 3px);
  background-color: coral;
}
.btn-close:hover:before {
  content: 'close';
  color: #fff;
  display: block;
  position: absolute;
  top: -27px;
  left: -4px;
  width: 8px;
  height: calc(100% + 3px);
}
</style>

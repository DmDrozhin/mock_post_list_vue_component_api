<template>
  <div class="btn-delete">
    <UIDeleteIcon :size="'25px'" />
  </div>
</template>

<script>
export default {
  name: 'UIDeleteButton',
  data() {
    return {}
  },
}
</script>

<style lang="css">
.btn-delete {
  width: 1.7rem;
  height: 1.7rem;
  background-color: transparent;
  position: relative;
  cursor: pointer;
}
.btn-delete:hover:after {
  content: '';
  display: block;
  position: absolute;
  top: 0px;
  right: -10px;
  width: 8px;
  height: calc(100% + 3px);
  background-color: coral;
}
.btn-delete:hover:before {
  content: 'delete';
  color: #fff;
  display: block;
  position: absolute;
  top: -25px;
  left: -10px;
  width: 8px;
  height: calc(100% + 3px);
}
</style>

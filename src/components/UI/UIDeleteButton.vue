<template>
  <div>
    <button class="btn-delete">╳</button>
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

<style scoped>
.btn-delete {
  box-sizing: content-box;
  font-size: 0.7rem;
  font-weight: 700;
  width: 1.5rem;
  height: 1.5rem;
  background-color: transparent;
  border: 1.5px solid #fff;
  color: #fff;
  position: relative;
  cursor: pointer;
}
.btn-delete:hover:after {
  content: '';
  display: block;
  position: absolute;
  top: -2px;
  right: -9px;
  width: 7px;
  height: 115%;
  background-color: coral;
}
</style>

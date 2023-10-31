<template>
  <div>
    <button class="btn-delete">╳</button>
  </div>
</template>

<script>
export default {
  name: 'DeleteButton',
  data() {
    return {}
  },
}
</script>

<style scoped>
.btn-delete {
  box-sizing: content-box;
  font-size: 0.9rem;
  font-weight: 700;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
  position: relative;
}
.btn-delete:hover:after {
  content: '';
  display: block;
  position: absolute;
  top: -2px;
  right: -12px;
  width: 4px;
  height: 36px;
  background-color: coral;
  border-right: 5px solid coral;
  /* box-shadow: 1px 1px 5px rgb(22, 22, 22); */
}
</style>

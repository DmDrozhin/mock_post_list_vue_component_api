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
  font-size: 0.7rem;
  font-weight: 700;
  width: 1.7rem;
  height: 1.7rem;
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
  top: -1.5px;
  right: -10px;
  width: 8px;
  height: calc(100% + 3px);
  background-color: coral;
}
</style>

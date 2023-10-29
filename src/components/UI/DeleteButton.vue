<template>
  <div>
    <button class="btn-delete" @click="deleteItem">❌</button>
  </div>
</template>

<script>
export default {
  name: 'DeleteButton',
  // props: {
  //   item: { type: Object, required: true, default: () => {} },
  // },
  data() {
    return {}
  },
  methods: {
    deleteItem() {
      // this.$emit('deleteItem', this.item.id)
      this.$emit('deleteItem')
    },
  },
}
</script>

<style scoped>
.btn-delete {
  width: 2rem;
  height: 2rem;
  background-color: #fff;
  border: 0;
}
</style>

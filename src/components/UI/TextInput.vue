<template>
  <div>
    <label for="text_input">
      <h3>{{ label }}</h3>
    </label>
    <input
      type="text"
      id="text_input"
      :placeholder="label"
      :value="title"
      @change="updateInput"
      :style="`height: ${height}rem`"
    />
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    label: { type: String, default: '' },
    height: { type: Number, default: 3 },
    title: { type: String || Number, default: String },
  },
  data() {
    return {}
  },
  watch: {},
  methods: {
    updateInput(ev) {
      this.$emit('update:title', ev.target.value)
    },
  },
}
</script>

<style scoped>
label {
  letter-spacing: 1px;
}
input {
  border: none;
  padding: 0 1rem;
  min-width: 100%;
  border-radius: 0.3rem;
  position: relative;
}
input:focus {
  border: none;
  outline: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 10px solid coral;
}
</style>

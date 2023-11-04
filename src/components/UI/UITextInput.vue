<template>
  <div>
    <label for="text_input">
      <h3>{{ label }}</h3>
    </label>
    <input
      type="text"
      id="text_input"
      :placeholder="label"
      v-model.trim.lazy="enteredData"
      :style="`height: ${height}rem`"
    />
  </div>
</template>

<script>
export default {
  name: 'UITextInput',
  props: {
    label: { type: String, default: '' },
    height: { type: Number, default: 3 },
    title: { type: String || Number, default: String },
  },
  data() {
    return {
      enteredData: '',
    }
  },
  watch: {
    enteredData(d) {
      this.$emit('changed', d)
    },
    clearForm(b) {
      if (b) {
        this.enteredData = ''
        this.$emit('filedCleared')
      }
    },
  },
  methods: {},
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

<template>
  <div>
    <label for="text_input">
      <h3>{{ label }}</h3>
    </label>
    <input
      type="text"
      id="text_input"
      :placeholder="label"
      :value="textInputValue"
      @change="handleInput($event)"
      @focus="this.$emit('focused')"
    />
  </div>
</template>

<script>
export default {
  name: 'UITextInput',
  props: {
    label: { type: String, default: '' },
    textInputValue: { type: String || Number, default: '' },
  },
  data() {
    return {}
  },
  watch: {},
  methods: {
    handleInput(ev) {
      if (ev) {
        this.$emit('update:textInputValue', ev.target.value)
      }
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
  padding: 0.5rem 1rem;
  min-width: 100%;
  border-radius: 0.3rem;
  position: relative;
  background-color: #fff;
}
input:focus {
  border: none;
  outline: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 10px solid coral;
}
</style>

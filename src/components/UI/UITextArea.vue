<template>
  <div>
    <label for="text_area">
      <h3>{{ label }}</h3>
    </label>
    <textarea
      id="text_area"
      :value="textAreaValue"
      @change="handleTextArea($event)"
      :placeholder="label"
      :rows="rows"
      @focus="this.$emit('focused')"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'UITextArea',
  props: {
    label: { type: String, default: '' },
    rows: { type: Number, default: 5 },
    textAreaValue: { type: String || Number, default: String },
  },
  data() {
    return {}
  },
  methods: {
    handleTextArea(ev) {
      if (ev) {
        this.$emit('update:textAreaValue', ev.target.value)
      }
    },
  },
}
</script>

<style scoped>
label {
  letter-spacing: 1px;
}
textarea {
  border: none;
  padding: 0 1rem;
  min-width: 100%;
  border-radius: 0.3rem;
  position: relative;
}
textarea:focus {
  border: none;
  outline: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 10px solid coral;
}
</style>

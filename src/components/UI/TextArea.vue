<template>
  <div>
    <label for="text_area">
      <h3>{{ label }}</h3>
    </label>
    <textarea
      id="text_area"
      :value="body"
      @change="updateInput"
      :placeholder="label"
      :rows="rows"
      :cols="cols"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'TextArea',
  props: {
    label: { type: String, default: '' },
    rows: { type: Number, default: 5 },
    cols: { type: Number, default: 33 },
    body: { type: String || Number, default: String },
  },
  data() {
    return {}
  },
  watch: {},
  methods: {
    updateInput(ev) {
      this.$emit('update:body', ev.target.value)
      console.log(ev.target)
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

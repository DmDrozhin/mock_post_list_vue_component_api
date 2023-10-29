<template>
  <div>
    <label for="text_area">
      <h3>{{ label }}</h3>
    </label>
    <textarea
      id="text_area"
      v-model.trim.lazy="enteredData"
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
    clearForm: { type: Boolean, default: false },
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

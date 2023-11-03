<template>
  <div>
    <select
      v-bind:value="selectedValue"
      @change="bubbleSelectedOption($event)"
      name="select-option"
    >
      <option disabled value="">Choose option</option>
      <option v-for="opt in options" :key="opt.prop" :value="opt.prop">
        {{ opt.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'UISelectOption',
  props: {
    selectedValue: { type: String },
    options: { type: Array, default: () => [] },
  },
  methods: {
    bubbleSelectedOption(event) {
      this.$emit('update:selectedValue', event.target.value)
    },
  },
}
</script>

<style scoped>
@import '@/styles/style.css';
select {
  outline: none;
  color: #fff;
  background-color: var(--main-bg-color);
  border: 1px solid #fff;
  min-width: 100%;
  min-height: 100%;
  border-radius: 0;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
select option:disabled {
  background-color: #fff;
}
</style>

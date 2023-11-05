<template>
  <div class="ui-custom-select select" @click="toggleOptionsList">
    <div class="select__dashboard flex-jcsb">
      <div class="select__output">
        {{ placeholder }}
      </div>
      <div class="select__icon">
        <UIArrowDown v-if="!isDropDownListOpen" />
        <UIArrowUp v-if="isDropDownListOpen" />
      </div>
    </div>
    <ul class="select__dropdown-list options-list" v-if="isDropDownListOpen">
      <li
        class="option-item"
        v-for="option in options"
        :key="option.prop"
        @click="processSelection(option.prop)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UICustomSelect',
  data() {
    return {
      isDropDownListOpen: false,
    }
  },
  props: {
    sortBy: { type: String },
    options: { type: Array, default: () => [] },
    clickTarget: { type: String, default: '' },
  },
  watch: {
    clickTarget(trg) {
      // Select element ev.target.className = 'select__dashboard flex-jcsb' && 'option-item'
      const clsName = 'option-item'
      if (this.isDropDownListOpen && trg !== clsName) {
        this.toggleOptionsList()
      }
    },
  },
  computed: {
    placeholder() {
      return this.options.find(el => el.prop === this.sortBy).name
    },
  },
  methods: {
    toggleOptionsList() {
      this.isDropDownListOpen = !this.isDropDownListOpen
    },
    processSelection(prop) {
      this.$emit('update:sortBy', prop)
      this.isDropDownListOpen = true
    },
  },
}
</script>

<style scoped>
@import '@/styles/style.css';
.select {
  position: relative;
  z-index: 1;
}
.select:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: -10px;
  display: block;
  height: 100%;
  width: 10px;
  background-color: coral;
}
.select__dashboard {
  max-width: 100%;
  max-height: 100%;
  border: var(--main-brd-width) solid #fff;
  z-index: -1;
}
.select__output {
  padding: 0.5rem 1rem;
  flex: 1 0 80%;
  z-index: -1;
  /* border: 2px solid rgb(114, 178, 17); */
}
.select__icon {
  flex: 1 0 20%;
  /* border: 1px solid rgb(255, 245, 47); */
  z-index: -1;
}

/* DROPDOWN LIST */
.options-list {
  display: block;
  width: 100%;
  list-style: none;
  position: absolute;
  top: calc(100% + 3px);
  left: 0;
  z-index: -1;
}
.option-item {
  border: 1px solid rgb(178, 178, 178);
  border-bottom: none;
  padding: 0.5rem 1rem;
  background-color: #000000b6;
  position: relative;
  z-index: 1;
}
.option-item:last-child {
  border-bottom: 1px solid rgb(178, 178, 178);
}
.option-item:hover {
  background-color: #000000;
}
.option-item:hover:after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  height: 100%;
  width: 10px;
  background-color: coral;
}
</style>

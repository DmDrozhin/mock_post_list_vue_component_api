<template>
  <div class="ui-custom-select select" @click="toggleOptionsList">
    <div class="select__box flex-jcsb">
      <div class="select__output">
        {{ placeholder }}
      </div>
      <div class="select__icon">
        <UIArrowIcon :direction="arrowDirection" :size="30" />
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
import { mapGetters } from 'vuex'
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
  },
  watch: {
    CLICKED_ELEMENT(trg) {
      const clsName = 'option-item'
      if (this.isDropDownListOpen && trg !== clsName) {
        this.toggleOptionsList()
      }
    },
  },
  computed: {
    ...mapGetters(['CLICKED_ELEMENT']),

    placeholder() {
      return this.options.find(el => el.prop === this.sortBy).name
    },
    arrowDirection() {
      return this.isDropDownListOpen ? 'rotate(180)' : 'rotate(0)'
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
.select__box {
  max-width: 100%;
  max-height: 100%;
  padding: 0.3rem 1rem;
  border: var(--main-brd-width) solid #fff;
  border-radius: var(--main-border-radius);
  z-index: -1;
}
.select__output {
  z-index: -1;
  /* border: 1px solid rgb(114, 178, 17); */
}
.select__icon {
  /* border: 1px solid rgb(255, 245, 47); */
  z-index: -1;
  display: grid;
  place-items: center;
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
  background-color: var(--semi-transp-bg);
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

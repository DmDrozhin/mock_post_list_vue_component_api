<template>
  <div class="ui-search-input search flex-jcl">
    <input
      class="search__input"
      type="text"
      placeholder="... Search"
      :value="search"
      @input="handleRequest($event.target.value)"
    />
    <UISearchIcon class="search__icon" :size="30" />
  </div>
</template>

<script>
export default {
  name: 'UISearchInput',
  props: {
    search: { type: String || Number, default: String },
  },
  data() {
    return {
      searchRequest: '',
    }
  },
  watch: {
    searchRequest(val) {
      if (!val) {
        this.$emit('update:search', '')
      }
    },
  },
  methods: {
    handleRequest(ev) {
      this.$emit('update:search', ev)
    },
  },
}
</script>

<style scoped>
@import '@/styles/style.css';
.search {
  position: relative;
  border: var(--main-brd-width) solid #fff;
  border-radius: var(--main-border-radius);
  /* gap: 0.5rem; */
}
.search:hover::before {
  content: '';
  position: absolute;
  top: calc(var(--main-brd-width) * -1);
  left: calc(-10px - var(--main-brd-width));
  display: block;
  height: calc(100% + var(--main-brd-width) * 2);
  width: 10px;
  background-color: coral;
}

.search__input {
  position: relative;
  color: #fff;
  padding: 0.5rem 0.8rem;
  margin-right: 0.5rem;
}
.search__input:focus {
  background-color: #fff;
  color: var(--semi-transp-bg);
}
.search__icon {
  z-index: 1;
  margin-right: 0.5rem;
}
</style>

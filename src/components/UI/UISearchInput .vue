<template>
  <div class="ui-search-input search flex-jcl">
    <div class="search__input-wrapper">
      <input
        class="search__input"
        type="text"
        id="search_input"
        placeholder="... Search"
        v-model.lazy="searchRequest"
      />
    </div>

    <div class="search__btn-wrapper">
      <button class="search__btn" @click="bubbleSearchRequest">
        <svg
          fill="#ffffff"
          height="25px"
          width="25px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 488.4 488.4"
          xml:space="preserve"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <g>
                <path
                  d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UISearchInput',
  props: {
    searchText: { type: String || Number, default: String },
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
    bubbleSearchRequest() {
      const req = this.searchRequest
      if (req) {
        this.$emit('update:search', req)
      } else this.$emit('update:search', '')
    },
  },
}
</script>

<style scoped>
@import '@/styles/style.css';
.search {
  position: relative;
  border: var(--main-brd-width) solid #fff;
  gap: 0.5rem;
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
.search__input-wrapper {
  flex-basis: 100px;
  flex-shrink: 1;
}
.search__input {
  padding: 0.5rem 1rem;
  /* background-color: var(--main-bg-color); */
  color: #fff;
}
.search__input:focus {
  background-color: #00000037;
}
.search__btn-wrapper {
  flex: 1 0 auto;
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search__btn {
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
}
/* .search__btn:active {
  background-color: var(--btn-bg-color-hover);
} */
svg {
  min-height: 100%;
  /* border: 1px solid rgb(0, 128, 38); */
}
</style>

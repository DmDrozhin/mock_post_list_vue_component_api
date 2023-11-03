<template>
  <div class="ui-search-input flex-jcl">
    <input
      type="text"
      id="search_input"
      placeholder="... Search"
      v-model.lazy="searchRequest"
    />
    <button @click="bubbleSearchRequest">
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
.ui-search-input {
  position: relative;
}
input {
  border: 1px solid #fff;
  color: #fff;
  background-color: var(--main-bg-color);
  padding: 0.5rem 1rem;
  min-width: 100%;
  min-height: 100%;
  outline: none;
}
button {
  position: absolute;
  display: block;
  outline: none;
  box-shadow: none;
  border: 1px solid #fff;
  z-index: 10;
  top: 0px;
  right: 0;
  height: 100%;
  width: 14%;
  padding: 0.3rem 0.2rem 0rem 0.2rem;
  background-color: var(--main-bg-color);
  /* color: #fff; */
  /* border: 1px solid #fff; */
}
button:hover::before {
  content: '';
  display: block;
  position: absolute;
  height: 100%;
  width: 10px;
  background-color: coral;
  top: 0;
  left: -10px;
}
button:active {
  background-color: var(--btn-bg-color-hover);
}
</style>

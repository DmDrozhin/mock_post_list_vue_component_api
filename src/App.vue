<template>
  <div
    class="app container"
    @click.capture="setClickedElementClass($event.target.className)"
  >
    <header class="header">
      <div class="header__wrapper flex-jcsb">
        <router-link to="/">
          <div class="header__title-wrapper flex-jcl">
            <div class="header__icon"></div>
            <h1 class="header__title">{{ title.toUpperCase() }}</h1>
          </div>
        </router-link>

        <div><NavMenu /></div>
      </div>
      <div class="header__spacer spacer"></div>
    </header>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu.vue'
import { mapActions } from 'vuex'

export default {
  components: { NavMenu },
  name: 'App',
  data() {
    return {
      title: 'Mock post-list',
    }
  },
  watch: {},
  computed: {},
  methods: {
    ...mapActions(['ACTION_SET_CLICKED_ELEMENT']),
    setClickedElementClass(className) {
      this.ACTION_SET_CLICKED_ELEMENT(className)
    },
  },
  mounted() {},
}
</script>

<style scoped>
@import './styles/style.css';

.header__title-wrapper {
  gap: 1rem;
}
.header__icon {
  width: 4rem;
  height: 4rem;
  background-image: url('@/icons/main-icon.svg');
  background-repeat: no-repeat;
  background-size: cover;
}
.header__title {
  position: relative;
  display: inline-block;
}
.header__title::after {
  content: '';
  display: block;
  position: absolute;
  right: -25px;
  top: 0;
  width: 15px;
  height: 100%;
  background-color: coral;
}
.header__spacer {
  margin: 1rem 0;
}
</style>

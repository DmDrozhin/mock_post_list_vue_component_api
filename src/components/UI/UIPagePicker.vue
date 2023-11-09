<template>
  <div class="page-picker">
    <div class="arrow" @click="leftClick">
      <UIArrowIcon :direction="'rotate(90)'" :size="30" />
    </div>
    <ul class="pages-qt-row">
      <li
        v-for="pg in totalPages"
        :key="pg"
        @click="handleClick(pg)"
        class="pages-qt-row__page-num"
        :class="{ active: pg === currentPage }"
      >
        {{ pg }}
      </li>
    </ul>
    <div class="arrow" @click="rightClick">
      <UIArrowIcon :direction="'rotate(-90)'" :size="30" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UIPagePicker',
  props: {
    totalPages: { type: Number, default: 10 },
    currentPage: { type: Number, default: 1 },
  },
  methods: {
    handleClick(pg) {
      this.$emit('update:currentPage', pg)
    },
    leftClick() {
      if (this.currentPage > 1) {
        this.handleClick(this.currentPage - 1)
      }
    },
    rightClick() {
      if (this.currentPage < this.totalPages) {
        this.handleClick(this.currentPage + 1)
      } else this.handleClick(1)
    },
  },
}
</script>

<style scoped>
@import '@/styles/style.css';
.page-picker {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
.pages-qt-row {
  display: flex;
  justify-content: center;
}
.pages-qt-row__page-num {
  list-style: none;
  color: #fff;
  padding: 0.2rem 0.3rem;
  cursor: default;
}
.pages-qt-row__page-num:hover,
.arrow:hover {
  background-color: var(--semi-transp-bg);
  opacity: 0.85;
}
.active {
  position: relative;
  background-color: var(--semi-transp-bg);
}

.active::after {
  content: '';
  display: block;
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: coral;
}
.arrow {
  z-index: 1;
  border-radius: 50%;
  padding: 0.4rem;
}
</style>

<template>
  <div class="nav-menu flex-jcr">
    <router-link class="link" to="/">
      <UICommonButton class="nav-menu__btn">Main</UICommonButton>
    </router-link>
    <router-link class="link" to="users">
      <UICommonButton class="nav-menu__btn">Users</UICommonButton>
    </router-link>
    <router-link class="link" to="about">
      <UICommonButton class="nav-menu__btn">About</UICommonButton>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data() {
    return {
      title: 'Main',
    }
  },
}
</script>

<style scoped>
@import '@/styles/style.css';
.nav-menu {
  gap: 1.5rem;
}
.link {
  min-width: 10rem;
}
</style>

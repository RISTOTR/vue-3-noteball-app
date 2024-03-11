<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item logo" href="https://bulma.io">
      <img src="../../assets/vue_logo.png">
    </a>
    <div class="navbar-item is-size-4">Noteballs</div>

    <a @click.prevent="showMobileNav = !showMobileNav"
    class="navbar-burger"
    ref="navbarBurgerRef"
    :class="{ 'is-active': showMobileNav}"
    aria-label="menu" 
    aria-expanded="false" 
    data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" 
  class="navbar-menu"
  :class="{ 'is-active': showMobileNav}"
  ref="navBarMenuRef"
  >
  <div class="navbar-start">
    <button 
    v-if="storeAuth.user.id"
    @click="logout" 
    class="button is-small is-primary mt-4 ml-3">Logout {{ storeAuth.user.email }}</button>
  </div>
    <div class="navbar-end">
      <RouterLink 
      @click="showMobileNav = false"
      to="/" 
      class="navbar-item" 
      active-class="is-active">
        Notes
      </RouterLink>
      <RouterLink 
      @click="showMobileNav = false"
      to="/stats" 
      class="navbar-item" 
      active-class="is-active">
        Stats
      </RouterLink>
    </div>
  </div>
</nav>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStoreAuth } from '@/stores/storeAuth';

const storeAuth = useStoreAuth()


const showMobileNav = ref(false)
const navBarMenuRef = ref(null)
const navbarBurgerRef = ref(null)

onClickOutside(navBarMenuRef, () => {
  showMobileNav.value = false
}, {
  ignore: [navbarBurgerRef]
})

const logout= () => {
  showMobileNav.value = false
  storeAuth.logOutUser()
}
</script>

<style scoped>
.navbar.is-success {
  background-color: #181818;
  border-bottom: 1px solid #42b883;
}
.navbar-end>.navbar-item,
.navbar-item {
  color: hsla(160, 100%, 37%, 1)!important;
}
.navbar-end>.navbar-item:hover,
.navbar-end>.navbar-item.is-active
 {
  color: black!important;
}
.navbar.is-success a {
  color: hsla(160, 100%, 37%, 1);
}
.nav-bar-item.logo {
  padding: 0.5rem 0.75rem;
}
@media screen and (max-width: 1023px) {
  .navbar-menu {
      background-color: #181818;
      position: absolute;
      left: 0;
      width: 100%;
  }
  a.navbar-item.is-active, a.navbar-item:focus, a.navbar-item:focus-within {
      background-color: #242424;
    }
    .navbar-end>.navbar-item[data-v-eae86677]:hover, .navbar-end>.navbar-item.is-active[data-v-eae86677]{
    color: hsla(160, 100%, 37%, 1)!important;

  }
}
@media (min-width: 1024px) {
  a.navbar-item img {
  width: 50px;
  height: auto;
  max-height: none;
}
}
</style>
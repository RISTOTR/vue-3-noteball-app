<template>
  <NavBar />
  <div class="container is-max-desktop px-2 py-5">
    <RouterView />
  </div>
</template>

<script setup>
import NavBar from '@/components/Layout/NavBar.vue'
import { useStoreAuth } from './stores/storeAuth'
import { onMounted } from 'vue';

const storeAuth = useStoreAuth()

onMounted(() => {
  storeAuth.init()

})
</script>
<style>
@import 'bulma/css/bulma.css';
a {
  color: hsla(160, 100%, 37%, 1);
  font-size: 18px;
}
</style>
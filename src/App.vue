<template>
  <DefaultLayout />
</template>

<script setup lang="ts">
import DefaultLayout from './layouts/DefaultLayout.vue';

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #eeeeee;
}
</style>
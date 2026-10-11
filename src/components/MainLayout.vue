<template>
  <div class="shell">
    <Rail />
    <main class="reader">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import Rail from './Rail.vue';

</script>
  
<style scoped>

</style>
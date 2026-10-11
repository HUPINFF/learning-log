<script setup>
import Masthead from './components/Masthead.vue'
import Rail from './components/Rail.vue'
</script>

<template>
  <Masthead />
  <div class="shell">
    <Rail />
    <main class="reader">
      <RouterView />
    </main>
  </div>
</template>

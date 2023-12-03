<script setup>
import iconSuggestions from '@/components/icons/suggestions.vue'
</script>

<template>
  <nav class="topbar">
    <iconSuggestions />


    Top bar

    <button class="primary">Add Feedback</button>
  </nav>
</template>

<style scoped>
.topbar{
  display: flex;
  justify-content: space-between;
  height: 72px;
  line-height: 72px;
  width: 100%;
  background-color: var(--navbar);
  color: var(--white);
}
</style>

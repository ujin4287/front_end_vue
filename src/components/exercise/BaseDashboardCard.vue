<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="dashboard-card">
    <h3>{{ title }}</h3>
    <slot />
  </div>
</template>

<style scoped>
.dashboard-card {
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
</style>

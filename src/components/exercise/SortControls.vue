<script setup>
const emit = defineEmits(['update-sort-key'])
</script>

<template>
  <div class="sort-buttons">
    <button @click="emit('update-sort-key', 'name')">이름순</button>
    <button @click="emit('update-sort-key', 'temp')">기온순</button>
  </div>
</template>

<style scoped>
.sort-buttons {
  margin-top: 0.5rem;
}
</style>

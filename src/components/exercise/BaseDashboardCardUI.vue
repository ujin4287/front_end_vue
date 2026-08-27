<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <el-card class="dashboard-card">
    <template #header>
      <span>{{ title }}</span>
    </template>
    <slot />
  </el-card>
</template>

<style scoped>
.dashboard-card {
  margin-bottom: 1.5rem;
}
</style>

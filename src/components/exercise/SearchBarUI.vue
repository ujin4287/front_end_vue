<script setup>
defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query'])

const handleInput = (value) => {
  emit('update-query', value)
}
</script>

<template>
  <div class="search-bar">
    <el-input
      :model-value="searchQuery"
      placeholder="검색할 도시 이름 입력"
      clearable
      @update:model-value="handleInput"
    />

    <p>검색 중인 도시: {{ searchQuery }}</p>
  </div>
</template>

<style scoped>
.search-bar {
  margin-bottom: 0.5rem;
}
</style>

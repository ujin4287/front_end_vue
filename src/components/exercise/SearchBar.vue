<script setup>
defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query'])

const handleInput = (event) => {
  emit('update-query', event.target.value)
}
</script>

<template>
  <div class="search-bar">
    <input
      type="text"
      :value="searchQuery"
      @input="handleInput"
      placeholder="검색할 도시 이름 입력"
    >

    <p>검색 중인 도시: {{ searchQuery }}</p>
  </div>
</template>

<style scoped>
.search-bar input {
  padding: 0.4rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>

<script setup>
defineProps({
  sortKey: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-sort-key'])
</script>

<template>
  <el-radio-group
    class="sort-buttons"
    :model-value="sortKey"
    @update:model-value="(value) => emit('update-sort-key', value)"
  >
    <el-radio-button label="name">이름순</el-radio-button>
    <el-radio-button label="temp">기온순</el-radio-button>
  </el-radio-group>
</template>

<style scoped>
.sort-buttons {
  margin-top: 0.5rem;
}
</style>

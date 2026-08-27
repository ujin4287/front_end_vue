<script setup>
import { useConfigStore } from '@/stores/configStore.js'
import { useUiStore } from '@/stores/uiStore.js'

const configStore = useConfigStore()
const uiStore = useUiStore()
</script>

<template>
  <div class="unit-toggler">
    <span>날씨단위: {{ configStore.unit === 'fahrenheit' ? '화씨' : '섭씨' }}({{ configStore.unitSymbol }})</span>
    <button v-if="!uiStore.useElementPlus" @click="configStore.toggleUnit">단위변경</button>
    <el-button v-else type="primary" @click="configStore.toggleUnit">단위변경</el-button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>

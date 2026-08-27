<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore.js'

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()

const displayTemp = computed(() => configStore.convertTemp(props.weather.temp))
const hotThreshold = computed(() => configStore.convertTemp(25))
</script>

<template>
  <el-card class="weather-card" @click="emit('select-card', weather)">
    <div class="weather-card__row">
      <div class="weather-card__info">
        <p class="weather-card__name">{{ weather.name }} ({{ weather.status }})</p>
        <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
      </div>

      <el-tag v-if="weather.temp >= 25" type="danger">
        더움 ({{ hotThreshold }}{{ configStore.unitSymbol }} 이상)
      </el-tag>

      <el-tag v-else type="primary">
        선선함 ({{ hotThreshold }}{{ configStore.unitSymbol }} 미만)
      </el-tag>

      <el-button type="primary" plain @click.stop="emit('click-detail', weather)">
        상세보기
      </el-button>
    </div>
  </el-card>
</template>

<style scoped>
.weather-card {
  margin-bottom: 0.75rem;
  cursor: pointer;
}

.weather-card__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.weather-card__name {
  font-weight: bold;
}
</style>

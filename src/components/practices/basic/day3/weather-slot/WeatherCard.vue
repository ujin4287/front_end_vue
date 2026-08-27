<script setup>
defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
</script>

<template>
  <div class="weather-card" @click="emit('select-card', weather)">
    <div class="weather-card__info">
      <p class="weather-card__name">{{ weather.name }} ({{ weather.status }})</p>
      <p>현재 기온: {{ weather.temp }}°C</p>
    </div>

    <span v-if="weather.temp >= 25" class="badge badge--hot">
      더움 (25°C 이상)
    </span>

    <span v-else class="badge badge--cool">
      선선함 (25°C 미만)
    </span>

    <button class="detail-button" @click.stop="emit('click-detail', weather)">
      상세보기
    </button>
  </div>
</template>

<style scoped>
.weather-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
}

.weather-card:hover {
  border-color: #b0b0b0;
}

.weather-card__name {
  font-weight: bold;
}

.badge {
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.85rem;
  white-space: nowrap;
}

.badge--hot {
  background: #fde2e1;
  color: #c0392b;
}

.badge--cool {
  background: #dceeff;
  color: #2471a3;
}

.detail-button {
  padding: 0.35rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #f5f5f5;
  cursor: pointer;
}
</style>

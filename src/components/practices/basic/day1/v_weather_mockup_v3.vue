<script setup>
import { ref, computed } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '판교', temp: 32, status: '흐림' },
])

const searchCity = ref('')
const selectedCity = ref('')

const filteredWeatherList = computed(() =>
  weatherList.value.filter((weather) => weather.name.includes(searchCity.value)),
)

const handleInput = (event) => {
  searchCity.value = event.target.value
}

const selectCity = (cityName) => {
  selectedCity.value = cityName
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="practice-section">

    <h2>과제 1: 날씨 (Mockup)</h2>

    <div>
      <h3>도시 검색</h3>

      <input
        type="text"
        :value="searchCity"
        @input="handleInput"
        placeholder="검색할 도시 이름 입력"
      >

      <p>검색 중인 도시: {{ searchCity }}</p>
    </div>

    <div>
      <h3>지역별 날씨 현황</h3>

      <div
        v-for="weather in filteredWeatherList"
        :key="weather.id"
        class="weather-card"
        @click="selectCity(weather.name)"
      >
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

        <button class="detail-button" @click.stop="showDetail(weather.name, weather.status)">
          상세보기
        </button>
      </div>
    </div>

    <div class="status-bar">
      <span v-if="selectedCity">
        {{ selectedCity }}이 선택되었습니다.
      </span>

      <span v-else>
        카드를 클릭하거나 검색해 보세요.
      </span>
    </div>

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

.status-bar {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  background: #eafbea;
  text-align: center;
}
</style>
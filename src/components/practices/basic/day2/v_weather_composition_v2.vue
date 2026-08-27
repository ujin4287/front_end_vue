<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '판교', temp: 32, status: '흐림' },
])

const searchQuery = ref('')
const selectedCityInfo = ref('')
// const filteredWeatherList = ref([...weatherList.value])

// const handleInput = (event) => {
//   searchQuery.value = event.target.value
//   filteredWeatherList.value = weatherList.value.filter((weather) =>
//     weather.name.includes(searchQuery.value),
//   )
// }

const handleInput = (event) => {
  searchQuery.value = event.target.value
}

const filteredWeatherList = computed(() =>
  weatherList.value.filter((weather) => weather.name.includes(searchQuery.value)),
)

watch(selectedCityInfo, (newValue) => {
  console.log(`[watch 감지] 상태바 문구가 업데이트 되었습니다. -> "${newValue}이 선택되었습니다."`)
})

watchEffect(() => {
  console.log(`[watchEffect 자동 호출] 현재 검색어: "${searchQuery.value}"`)
})

const sortKey = ref('name')

const sortedWeatherList = computed(() => {
  return [...filteredWeatherList.value].sort((a, b) => {
    if (sortKey.value === 'temp') return a.temp - b.temp
    return a.name.localeCompare(b.name)
  })
})

watch(sortKey, (newValue) => {
  console.log(`[watch 감지] 정렬 기준이 "${newValue}"(으)로 변경되었습니다.`)
})

const selectCity = (cityName) => {
  selectedCityInfo.value = cityName
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>
 
<template>
  <div class="practice-section">

    <h2>과제 2: 날씨 (컴포지션)</h2>

    <div>
      <h3>도시 검색</h3>

      <input
        type="text"
        :value="searchQuery"
        @input="handleInput"
        placeholder="검색할 도시 이름 입력"
      >

      <p>검색 중인 도시: {{ searchQuery }}</p>

      <div>
        <button @click="sortKey = 'name'">이름순</button>
        <button @click="sortKey = 'temp'">기온순</button>
      </div>
    </div>

    <div>
      <h3>지역별 날씨 현황</h3>

      <div v-if="filteredWeatherList.length > 0">
        <div
          v-for="weather in sortedWeatherList"
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
    <p v-else>검색 결과가 일치하는 도시가 없습니다.</p>
    </div>

    <!--
    <div>
      <h3>지역별 날씨 현황</h3>

      <div
        v-if="filteredWeatherList.length > 0"
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
    -->

    <div class="status-bar">
      <span v-if="selectedCityInfo">
        {{ selectedCityInfo }}이 선택되었습니다.
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

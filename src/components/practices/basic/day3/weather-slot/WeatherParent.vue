<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import SortControls from './SortControls.vue'
import WeatherCard from './WeatherCard.vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '판교', temp: 32, status: '흐림' },
])

const searchQuery = ref('')
const selectedCityInfo = ref('')

const handleUpdateQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const handleUpdateSortKey = (newSortKey) => {
  sortKey.value = newSortKey
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

const selectCity = (weather) => {
  selectedCityInfo.value = weather.name
}

const showDetail = (weather) => {
  window.alert(`${weather.name}의 현재 날씨는 [${weather.status}] 상태입니다.`)
}
</script>

<template>
  <div class="practice-section">

    <h2>과제 3: 날씨 (컴포넌트 분리)</h2>

    <BaseDashboardCard title="도시 검색">
      <SearchBar :search-query="searchQuery" @update-query="handleUpdateQuery" />

      <SortControls @update-sort-key="handleUpdateSortKey" />
    </BaseDashboardCard>

    <BaseDashboardCard title="지역별 날씨 현황">
      <template v-if="filteredWeatherList.length > 0">
        <WeatherCard
          v-for="weather in sortedWeatherList"
          :key="weather.id"
          :weather="weather"
          @select-card="selectCity"
          @click-detail="showDetail"
        />
      </template>

      <p v-else>검색 결과가 일치하는 도시가 없습니다.</p>
    </BaseDashboardCard>

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
.status-bar {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  background: #eafbea;
  text-align: center;
}
</style>

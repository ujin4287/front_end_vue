<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUiStore } from '@/stores/uiStore.js'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import BaseDashboardCardUI from '../components/exercise/BaseDashboardCardUI.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import SearchBarUI from '../components/exercise/SearchBarUI.vue'
import SortControls from '../components/exercise/SortControls.vue'
import SortControlsUI from '../components/exercise/SortControlsUI.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import WeatherCardUI from '../components/exercise/WeatherCardUI.vue'

const router = useRouter()
const uiStore = useUiStore()

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const cityCoords = [
  { id: 'city_01', name: '서울', lat: 37.5665, lon: 126.978 },
  { id: 'city_02', name: '수원', lat: 37.2636, lon: 127.0286 },
  { id: 'city_03', name: '부산', lat: 35.1796, lon: 129.0756 },
  { id: 'city_04', name: '판교', lat: 37.3947, lon: 127.1112 },
  { id: 'city_05', name: 'SKAX 판교', lat: 37.4058453, lon: 127.0998294 },
]

const weatherList = ref([])
const isLoading = ref(false)

const fetchWeatherList = async () => {
  isLoading.value = true

  try {
    const responses = await axios.all(
      cityCoords.map((city) =>
        axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: { lat: city.lat, lon: city.lon, appid: API_KEY, units: 'metric', lang: 'kr' },
        }),
      ),
    )

    weatherList.value = responses.map((response, index) => ({
      id: cityCoords[index].id,
      name: cityCoords[index].name,
      temp: Math.round(response.data.main.temp),
      status: response.data.weather[0].description,
    }))
  } catch (error) {
    console.error('날씨 데이터를 가져오지 못했습니다:', error)
    const message = '날씨 데이터를 가져오지 못했습니다. API 키 활성화 여부를 확인하세요.'
    if (uiStore.useElementPlus) {
      ElMessage.error(message)
    } else {
      alert(message)
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchWeatherList)

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
  router.push('/axios/weather/' + weather.id)
}
</script>

<template>
  <div class="practice-section">

    <BaseDashboardCard v-if="!uiStore.useElementPlus" title="도시 검색">
      <SearchBar :search-query="searchQuery" @update-query="handleUpdateQuery" />
      <SortControls @update-sort-key="handleUpdateSortKey" />
    </BaseDashboardCard>
    <BaseDashboardCardUI v-else title="도시 검색">
      <SearchBarUI :search-query="searchQuery" @update-query="handleUpdateQuery" />
      <SortControlsUI :sort-key="sortKey" @update-sort-key="handleUpdateSortKey" />
    </BaseDashboardCardUI>

    <BaseDashboardCard v-if="!uiStore.useElementPlus" title="지역별 날씨 현황">
      <p v-if="isLoading">날씨 데이터를 불러오는 중입니다...</p>
      <template v-else-if="filteredWeatherList.length > 0">
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
    <BaseDashboardCardUI v-else v-loading="isLoading" title="지역별 날씨 현황">
      <template v-if="filteredWeatherList.length > 0">
        <WeatherCardUI
          v-for="weather in sortedWeatherList"
          :key="weather.id"
          :weather="weather"
          @select-card="selectCity"
          @click-detail="showDetail"
        />
      </template>
      <p v-else-if="!isLoading">검색 결과가 일치하는 도시가 없습니다.</p>
    </BaseDashboardCardUI>

    <div v-if="!uiStore.useElementPlus" class="status-bar">
      <span v-if="selectedCityInfo">
        {{ selectedCityInfo }}이 선택되었습니다.
      </span>

      <span v-else>
        카드를 클릭하거나 검색해 보세요.
      </span>
    </div>

    <el-alert
      v-else
      :title="selectedCityInfo ? `${selectedCityInfo}이 선택되었습니다.` : '카드를 클릭하거나 검색해 보세요.'"
      :type="selectedCityInfo ? 'success' : 'info'"
      :closable="false"
      show-icon
      center
    />

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

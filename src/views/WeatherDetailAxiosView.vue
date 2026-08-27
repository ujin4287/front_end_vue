<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useConfigStore } from '@/stores/configStore.js'
import { useUiStore } from '@/stores/uiStore.js'

const route = useRoute()
const configStore = useConfigStore()
const uiStore = useUiStore()

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const cityCoords = [
  { id: 'city_01', region: '대한민국 서울특별시', lat: 37.5665, lon: 126.978 },
  { id: 'city_02', region: '대한민국 수원시', lat: 37.2636, lon: 127.0286 },
  { id: 'city_03', region: '대한민국 부산광역시', lat: 35.1796, lon: 129.0756 },
  { id: 'city_04', region: '대한민국 성남시 판교', lat: 37.3947, lon: 127.1112 },
  { id: 'city_05', region: 'SKAX 판교', lat: 37.4058453, lon: 127.0998294 },
]

const cityDetail = ref(null)
const isLoading = ref(false)

onMounted(async () => {
  const matchedCity = cityCoords.find((city) => city.id === route.params.cityId)
  if (!matchedCity) return

  isLoading.value = true

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { lat: matchedCity.lat, lon: matchedCity.lon, appid: API_KEY, units: 'metric', lang: 'kr' },
    })

    cityDetail.value = {
      region: matchedCity.region,
      temp: Math.round(response.data.main.temp),
      status: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
    }
  } catch (error) {
    console.error('상세 날씨 데이터를 가져오지 못했습니다:', error)
    const message = '상세 날씨 데이터를 가져오지 못했습니다. API 키 활성화 여부를 확인하세요.'
    if (uiStore.useElementPlus) {
      ElMessage.error(message)
    } else {
      alert(message)
    }
  } finally {
    isLoading.value = false
  }
})

const displayTemp = computed(() =>
  cityDetail.value ? configStore.convertTemp(cityDetail.value.temp) : null,
)
</script>

<template>
  <div class="practice-section" v-loading="uiStore.useElementPlus && isLoading">
    <h3>지역별 상세 기상 관측 정보</h3>

    <p v-if="!uiStore.useElementPlus && isLoading">날씨 데이터를 불러오는 중입니다...</p>

    <div v-else-if="cityDetail && !uiStore.useElementPlus" class="detail-card">
      <p>지정 지역: {{ cityDetail.region }}</p>
      <p>실시간 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
      <p>기상 현황: {{ cityDetail.status }}</p>
      <p>대기 습도: {{ cityDetail.humidity }}%</p>
      <p>현재 풍속: {{ cityDetail.windSpeed }}m/s</p>
    </div>

    <el-card v-else-if="cityDetail" class="detail-card">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="지정 지역">{{ cityDetail.region }}</el-descriptions-item>
        <el-descriptions-item label="실시간 기온">{{ displayTemp }}{{ configStore.unitSymbol }}</el-descriptions-item>
        <el-descriptions-item label="기상 현황">{{ cityDetail.status }}</el-descriptions-item>
        <el-descriptions-item label="대기 습도">{{ cityDetail.humidity }}%</el-descriptions-item>
        <el-descriptions-item label="현재 풍속">{{ cityDetail.windSpeed }}m/s</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <p v-else-if="!isLoading">해당 도시의 관측 정보를 찾을 수 없습니다.</p>

    <RouterLink to="/axios">← 메인 대시보드로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.detail-card {
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
</style>

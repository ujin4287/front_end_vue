<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useConfigStore } from '@/stores/configStore.js'
import { useUiStore } from '@/stores/uiStore.js'

const route = useRoute()
const configStore = useConfigStore()
const uiStore = useUiStore()

const cityDetailMockData = [
  { id: 'city_01', region: '대한민국 서울특별시', temp: 28, status: '맑음', humidity: 55, windSpeed: 2.5 },
  { id: 'city_02', region: '대한민국 수원시', temp: 24, status: '비', humidity: 78, windSpeed: 3.1 },
  { id: 'city_03', region: '대한민국 부산광역시', temp: 26, status: '구름', humidity: 65, windSpeed: 4.0 },
  { id: 'city_04', region: '대한민국 성남시 판교', temp: 32, status: '흐림', humidity: 60, windSpeed: 1.8 },
]

const cityDetail = ref(null)

onMounted(() => {
  cityDetail.value = cityDetailMockData.find((city) => city.id === route.params.cityId) ?? null
})

const displayTemp = computed(() =>
  cityDetail.value ? configStore.convertTemp(cityDetail.value.temp) : null,
)
</script>

<template>
  <div class="practice-section">
    <h3>지역별 상세 기상 관측 정보</h3>

    <div v-if="cityDetail && !uiStore.useElementPlus" class="detail-card">
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

    <p v-else>해당 도시의 관측 정보를 찾을 수 없습니다.</p>

    <RouterLink to="/">← 메인 대시보드로 돌아가기</RouterLink>
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

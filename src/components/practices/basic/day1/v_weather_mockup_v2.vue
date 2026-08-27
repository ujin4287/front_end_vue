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
        @click="selectCity(weather.name)"
      >
        <p>{{ weather.name }} ({{ weather.status }})</p>
        <p>현재 기온: {{ weather.temp }}°C</p>

        <span v-if="weather.temp >= 25">
          더움 (25°C 이상)
        </span>

        <span v-else>
          선선함 (25°C 미만)
        </span>

        <button @click.stop="showDetail(weather.name, weather.status)">
          상세보기
        </button>
      </div>
    </div>

    <div>
      <span v-if="selectedCity">
        {{ selectedCity }}이 선택되었습니다.
      </span>

      <span v-else>
        카드를 클릭하거나 검색해 보세요.
      </span>
    </div>

  </div>
</template>
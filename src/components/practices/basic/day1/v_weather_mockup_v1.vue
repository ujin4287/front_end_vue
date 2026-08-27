<script setup>
import { ref, computed } from 'vue'
const weatherList = ref([
    { id: 'city_01' , name: '서울', temp: 28, status: '맑음' },
    { id: 'city_02' , name: '수원', temp: 24, status: '비' },
    { id: 'city_03' , name: '부산', temp: 26, status: '구름' },
])

const search = ref('')

const filteredWeatherList = computed(() => {
    return weatherList.value.filter(weather =>
        weather.name.includes(search.value)
    )
})


</script>

<template>
    <div class="practice-section">
        <h2>과제 1: 날씨 (Mockup)</h2>

        <h3>도시 검색</h3>
        <input
            v-model="search"
            type="text"
            placeholder="검색할 도시 이름 입력"
        >

        <ul>
            <li v-for="weather in filteredWeatherList" :key="weather.id">
                {{ weather.name }} 현재 기온 {{ weather.temp }}°C {{ weather.status }}</li>
        </ul>

    </div>
</template>




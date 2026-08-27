<script setup>
// import { ref } from 'vue' // 사용하지 않아 주석 처리
const welcomeMessage = 'Welcome to Skala-Vue'
</script>
<template>
    <div class="practice-section">
        <h2>{{ welcomeMessage }}</h2>
        <p>{{ welcomeMessage.toUpperCase() }}</p>
        <p>{{ 'Random number: ' + Math.ceil(Math.random() * 100) }}</p>
</div>
</template>
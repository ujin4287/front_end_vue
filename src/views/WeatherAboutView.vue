<script setup>
import { useUiStore } from '@/stores/uiStore.js'

const uiStore = useUiStore()
</script>

<template>
  <div v-if="!uiStore.useElementPlus" class="practice-section">
    <h3>서비스 소개</h3>

    <p>본 앱은 Vue 3 및 Vue Router 기반으로 제작된 실습용 날씨 대시보드입니다.</p>

    <ul>
      <li>components/exercise 폴더의 재사용 컴포넌트로 검색창과 날씨 카드 UI 구성</li>
      <li>클라이언트 사이드 라우팅을 통해 새로고침 없이 화면 전환</li>
      <li>URL 동적 경로(:cityId)로 도시별 상세 정보 조회</li>
    </ul>

    <RouterLink to="/">대시보드 홈으로 이동</RouterLink>
  </div>

  <el-card v-else class="practice-section">
    <template #header>
      <span>서비스 소개</span>
    </template>

    <p>본 앱은 Vue 3 및 Vue Router 기반으로 제작된 실습용 날씨 대시보드입니다.</p>

    <ul>
      <li>components/exercise 폴더의 재사용 컴포넌트로 검색창과 날씨 카드 UI 구성</li>
      <li>클라이언트 사이드 라우팅을 통해 새로고침 없이 화면 전환</li>
      <li>URL 동적 경로(:cityId)로 도시별 상세 정보 조회</li>
    </ul>

    <RouterLink to="/">
      <el-button type="primary" text>대시보드 홈으로 이동</el-button>
    </RouterLink>
  </el-card>
</template>

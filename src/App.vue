<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUiStore } from './stores/uiStore.js'
import UnitToggler from './components/exercise/UnitToggler.vue'

const uiStore = useUiStore()
const route = useRoute()

watch(
  () => uiStore.useElementPlus,
  (newValue) => {
    if (newValue) {
      ElMessage.success('UI 라이브러리가 적용되었습니다.')
    } else {
      alert('UI 라이브러리 적용이 해제되었습니다.')
    }
  },
)
</script>
<template>
  <div style="padding: 20px">
    <h2>날씨 대시보드: UI 라이브러리 적용</h2>

    <div class="top-bar">
      <nav v-if="!uiStore.useElementPlus" class="nav-bar">
        <RouterLink to="/">날씨 대시보드</RouterLink>
        <RouterLink to="/about">서비스 소개</RouterLink>
        <RouterLink to="/axios">실시간 날씨 (Axios)</RouterLink>
      </nav>

      <el-menu v-else mode="horizontal" :default-active="route.path" router class="nav-menu">
        <el-menu-item index="/">날씨 대시보드</el-menu-item>
        <el-menu-item index="/about">서비스 소개</el-menu-item>
        <el-menu-item index="/axios">실시간 날씨 (Axios)</el-menu-item>
      </el-menu>

      <div class="controls">
        <UnitToggler />

        <span>UI 라이브러리 적용</span>
        <button v-if="!uiStore.useElementPlus" @click="uiStore.toggleUseElementPlus">UI 라이브러리 켜기</button>
        <el-button v-else type="primary" @click="uiStore.toggleUseElementPlus">UI 라이브러리 끄기</el-button>
      </div>
    </div>

    <RouterView />
  </div>
</template>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.nav-bar {
  display: flex;
  gap: 1rem;
}

.nav-menu {
  flex: 1;
}

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const useElementPlus = ref(false)

  function toggleUseElementPlus() {
    useElementPlus.value = !useElementPlus.value
  }

  return { useElementPlus, toggleUseElementPlus }
})

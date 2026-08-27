import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const unit = ref('celsius')

  const unitSymbol = computed(() => (unit.value === 'fahrenheit' ? '°F' : '°C'))

  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  function convertTemp(rawTemp) {
    if (unit.value === 'fahrenheit') {
      return Math.round((rawTemp * 9) / 5 + 32)
    }
    return rawTemp
  }

  return { unit, unitSymbol, toggleUnit, convertTemp }
})

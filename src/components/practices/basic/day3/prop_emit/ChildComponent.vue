<script setup>
defineProps({
  message: {
    type: String,
  },
})
 
const emit = defineEmits(['hello'])
 
const onClickButton = () => {
  emit('hello', 'say hello')
}
</script>
 
<template>
  <h1>{{ message }}</h1>
  <button @click="onClickButton">부모에게 인사하기</button>
</template>
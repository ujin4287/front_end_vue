<script setup>
import ChildComponent from './ChildComponent.vue'

const parentMessage = 'Hello from Parent!'

const emitHandler = (value) => {
  console.log(value)
}
</script>

<template>
  <ChildComponent :message="parentMessage" @hello="emitHandler" />
</template>
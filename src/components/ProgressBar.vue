<template>
  <svg :width="size" :height="size" viewBox="0 0 52 52" fill="none">
    <circle cx="26" cy="26" r="20" fill="url(#paint0_linear_406_1549)"/>

    <circle
      transform="rotate(-90 26 26)"
      cx="26"
      cy="26"
      r="25"
      stroke="#FC8D2D"
      stroke-width="2"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="progressOffset"
    />

    <path d="M32 26L22 32L22 20L32 26Z" fill="white"/>
    <defs>
      <linearGradient
        id="paint0_linear_406_1549"
        x1="26"
        y1="6"
        x2="26"
        y2="46"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#8D7CFC" />
        <stop offset="1" stop-color="#7061E1" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  progress: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100
  },
  size: {
    type: Number,
    default: 52
  }
})

const circumference = ref(2 * Math.PI * 25)
const progressOffset = ref(0)

watch(
  () => props.progress,
  () => {
    const offset = circumference.value - (props.progress / 100) * circumference.value
    progressOffset.value = offset
  }
)

onMounted(() => {
  const offset = circumference.value - (props.progress / 100) * circumference.value
  progressOffset.value = offset
})
</script>

<style scoped>
circle[fill='url(#paint0_linear_406_1549)'] {
  stroke-width: 2;
  transition: stroke-dasharray 0.5s ease-out;
}
path,
text {
  transform-box: fill-box;
  transform-origin: center;
}
</style>

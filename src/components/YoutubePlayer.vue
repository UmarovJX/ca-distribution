<template>
  <div>
    <div ref="player" class="youtube_iframe"></div>
    <div class="ttt"></div>
  </div>
</template>

<script setup>
import { useProgressStore } from '../stores/progress'
import { usePlayer } from '@vue-youtube/core'
import { ref, onBeforeUnmount } from 'vue'
const props = defineProps({
  videoId: { type: String, required: true },
  lessonId: { type: String, required: true }
})
const emits = defineEmits(['duration', 'finish'])

const { setProgress, progress } = useProgressStore()

const interval = ref(null)

const player = ref(null)
const { instance, onStateChange, onReady } = usePlayer(props.videoId, player)
onReady(() => {
  emits('duration', instance.value.getDuration())
})

function updateProgress() {
  const key = props.lessonId
  const val = (instance.value.getCurrentTime() / instance.value.getDuration()) * 100
  if (!progress[key] || val > progress[key]) {
    setProgress(key, val)
  }
}
onStateChange((event) => {
  if (event.data === 1 || event.data === 2) {
    updateProgress()
    if (event.data === 1) interval.value = setInterval(updateProgress, 1000)
    else clearInterval(interval.value)
  }

  if (event.data === 0) {
    setProgress(props.lessonId, 100)
    emits('finish')
    clearInterval(interval.value)
  }
})
onBeforeUnmount(() => clearInterval(interval.value))
</script>

<style>
.ttt {
  border-radius: 10px 10px 0 0;
  margin-top: -15px;
  height: 10px;
  background-color: var(--background-color);
}
</style>

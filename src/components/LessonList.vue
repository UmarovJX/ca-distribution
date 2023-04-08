<template>
  <div class="lesson_list">
    <LessonPanel
      v-for="(lesson, i) in lessons"
      :key="lesson.id"
      :lesson="lesson"
      :index="i + 1"
      :isAvailable="lessons[i - 1]?.is_completed || i === 0"
    ></LessonPanel>
  </div>
</template>

<script setup>
import LessonPanel from './LessonPanel.vue'
defineProps(['lessons'])
</script>

<style scoped>
.lesson_list > div:not(:first-child) {
  margin-top: 20px;
}
</style>

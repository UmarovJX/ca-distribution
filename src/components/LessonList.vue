<template>
  <div class="lesson_list flex-grow flex-column">
    <LessonPanel
      v-for="(lesson, i) in lessons"
      :key="lesson.id"
      :lesson="lesson"
      :index="i + 1"
      :isAvailable="lessons[i - 1]?.is_completed || i === 0"
    ></LessonPanel>
    <div></div>
    <button @click="startTest" class="mt-auto">{{ $t('startTest') }}</button>
    <!-- v-if="lessons[lessons.length-1]?.is_completed" -->
  </div>
</template>

<script setup>
import LessonPanel from './LessonPanel.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps(['lessons'])
function startTest() {
  router.push({ name: 'test', params: { id: props.lessons[0].course_id } })
}
</script>

<style scoped>
.lesson_list > div:not(:first-child) {
  margin-top: 20px;
}
.mt-auto {
  margin-top: auto;
}
</style>

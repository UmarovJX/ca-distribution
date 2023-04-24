<template>
  <div class="lesson_list flex-grow flex-column">
    <LessonPanel
      v-for="(lesson, i) in lessonList"
      :key="lesson.id"
      :lesson="lesson"
      :index="i + 1"
      :isAvailable="lessonList[i - 1]?.is_completed || i === 0"
    ></LessonPanel>
    <BasicLoader v-if="isLoading"></BasicLoader>
    <div v-intersection-observer="onIntersectionObserver" v-if="!isLoading && hasNextPage"></div>
    <div></div>
    <button v-if="isTestAvailable" @click="startTest" class="mt-auto">
      {{ $t('startTest') }}
    </button>
  </div>
</template>

<script setup>
import LessonPanel from './LessonPanel.vue'
import BasicLoader from './BasicLoader.vue'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useLessonList } from '../composables/courses'
import { vIntersectionObserver } from '@vueuse/components'
import courseService from '../services/courseService'
import { useProgressStore } from '../stores/progress'
const { deleteProgress } = useProgressStore()

const router = useRouter()
const props = defineProps({
  courseId: {
    type: Number,
    required: true
  },
  attempts: {
    type: Number,
    required: true
  },
  finishedLesson: {
    type: Number
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
})

const { hasNextPage, lessonList, isLoading, getLessons } = useLessonList(props.courseId)

function startTest() {
  router.push({ name: 'test', params: { id: props.courseId } })
}

const isTestAvailable = computed(
  () =>
    !hasNextPage.value &&
    lessonList.value.every((el) => el.is_completed) &&
    props.attempts &&
    !props.isCompleted
)
function onIntersectionObserver([{ isIntersecting }]) {
  if (isIntersecting) getLessons()
}

watch(
  () => props.finishedLesson,
  () => {
    courseService
      .completeLesson(props.finishedLesson)
      .then(() => {
        const ls = lessonList.value.map((el) => el)
        const l = lessonList.value.find((el) => el.id === +props.finishedLesson)
        l.is_completed = true
        lessonList.value = ls
      })
      .catch(() => {
        deleteProgress(props.finishedLesson)
        router.push({ name: 'course', params: { id: props.courseId } })
      })
  }
)
</script>

<style scoped>
.lesson_list > div:not(:first-child) {
  margin-top: 20px;
}
.mt-auto {
  margin-top: auto;
}
</style>

<template>
  <div class="part">
    <h2 class="section-header">{{ $t('finishedCourses') }}</h2>
  </div>
  <div class="container">
    <CoursePanel v-for="course in courseList" :course="course" :key="course.id"></CoursePanel>
    <BasicLoader v-if="isLoading"></BasicLoader>
    <div v-intersection-observer="onIntersectionObserver" v-if="!isLoading && hasNextPage"></div>
  </div>
  <div v-if="courseList.length === 0" :style="{ textAlign: 'center' }">{{ $t('notFound') }}</div>
</template>

<script setup>
import { useCourseList } from '../composables/courses'
import BasicLoader from './BasicLoader.vue'
import CoursePanel from './CoursePanel.vue'
import { vIntersectionObserver } from '@vueuse/components'
function onIntersectionObserver([{ isIntersecting }]) {
  if (isIntersecting) getCourses()
}
const { hasNextPage, courseList, isLoading, getCourses } = useCourseList({
  statusList: ['completed']
})
</script>

<style scoped></style>

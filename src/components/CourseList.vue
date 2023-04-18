<template>
  <div class="part">
    <h2 class="section-header">{{ props.title }}</h2>
    <span class="section-secondary">{{ $t('viewAll') }}</span>
  </div>
  <div class="scroll-horizontal">
    <course-card v-for="course in courseList" :course="course" :key="course.id"></course-card>
    <div :style="{ flexGrow: '1' }" v-if="isLoading">
      <BasicLoader></BasicLoader>
    </div>
  </div>
</template>

<script setup>
import CourseCard from './CourseCard.vue'
import BasicLoader from './BasicLoader.vue'
import { useCourseList } from '../composables/courses'

const props = defineProps({
  statusList: { type: Array, default: () => [] },
  title: { type: String, required: true }
})
const { isLoading, courseList, getCourses } = useCourseList({ statusList: props.statusList })
getCourses()
</script>

<style>
.scroll-horizontal {
  overflow-x: scroll;
  width: 100%;
  padding-left: 20px;
  display: flex;
}
.scroll-horizontal::-webkit-scrollbar {
  display: none;
}
.scroll-horizontal .course-card {
  margin-right: 20px;
}
.part {
  display: flex;
  justify-content: space-between;
  padding: 40px 20px 20px 20px;
  align-items: center;
}
</style>

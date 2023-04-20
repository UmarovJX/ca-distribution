<template>
  <div class="part">
    <h2 class="section-header">{{ props.title }}</h2>
    <span class="section-secondary" v-if="props.link" @click="goTo">{{ $t('viewAll') }}</span>
  </div>
  <div class="scroll-horizontal">
    <course-card
      v-for="course in courseList"
      :course="course"
      :key="course.id"
      :vertical="props.vertical"
    ></course-card>
    <div :style="{ flexGrow: '1' }" v-if="isLoading">
      <BasicLoader></BasicLoader>
    </div>
    <div v-intersection-observer="onIntersectionObserver" v-if="!isLoading && hasNextPage"></div>
  </div>
</template>

<script setup>
import CourseCard from './CourseCard.vue'
import BasicLoader from './BasicLoader.vue'
import { useCourseList } from '../composables/courses'
import { vIntersectionObserver } from '@vueuse/components'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  statusList: { type: Array, default: () => [] },
  title: { type: String, required: true },
  vertical: { type: Boolean, default: false },
  link: { type: Object, default: null }
})
const { isLoading, courseList, getCourses, hasNextPage } = useCourseList({
  statusList: props.statusList
})

function onIntersectionObserver([{ isIntersecting }]) {
  if (isIntersecting) getCourses()
}
function goTo() {
  router.push(props.link)
}
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

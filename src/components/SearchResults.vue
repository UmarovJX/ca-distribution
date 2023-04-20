<template>
  <section>
    <div class="part">
      <h2 class="section-header">{{ $t('found_courses') }}</h2>
    </div>
    <div v-if="isEmptyResult" :style="{ textAlign: 'center' }">{{ $t('notFound') }}</div>
    <div class="scroll-horizontal">
      <course-card v-for="course in courseList" :course="course" :key="course.id"></course-card>
      <div :style="{ flexGrow: '1' }" v-if="isLoading">
        <BasicLoader></BasicLoader>
      </div>
      <div v-intersection-observer="onIntersectionObserver" v-if="loadMore"></div>
    </div>
  </section>
</template>

<script setup>
import CourseCard from './CourseCard.vue'
import BasicLoader from './BasicLoader.vue'
import { useSearchCourses } from '../composables/courses'
import { vIntersectionObserver } from '@vueuse/components'
import { computed } from 'vue'

const props = defineProps(['searchString'])
const { isLoading, courseList, search, isEmptyResult, hasNextPage } = useSearchCourses(
  props.searchString
)
function onIntersectionObserver([{ isIntersecting }]) {
  if (isIntersecting) search()
}

const loadMore = computed(() => !isLoading.value && hasNextPage.value && !isEmptyResult.value)
</script>

<style></style>

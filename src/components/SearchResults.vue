<template>
  <section v-if="isSearching || searchedCourses.length > 0 || isEmptyResult">
    <div class="part">
      <h2 class="section-header">{{ $t('found_courses') }}</h2>
    </div>
    <BasicLoader v-if="isSearching"></BasicLoader>
    <div v-if="isEmptyResult" :style="{ textAlign: 'center' }">{{ $t('notFound') }}</div>
    <div class="scroll-horizontal">
      <course-card
        v-for="course in searchedCourses"
        :course="course"
        :key="course.id"
      ></course-card>
    </div>
  </section>
</template>

<script setup>
import CourseCard from './CourseCard.vue'
import BasicLoader from './BasicLoader.vue'
import { watch } from 'vue'
import { useSearchCourses } from '../composables/courses'
import debounce from '../utils/debounce'
const props = defineProps(['searchString'])
const { isSearching, searchedCourses, search, isEmptyResult, clearSearch } = useSearchCourses()

watch(
  () => props.searchString,
  debounce((str) => {
    if (str.length > 2) search(str)
    else clearSearch()
  }, 400)
)
</script>

<style></style>

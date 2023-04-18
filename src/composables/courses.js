import { ref } from 'vue'
import courses from '../services/courseService.js'
import { useProgressStore } from '../stores/progress.js'

export function useSearchCourses() {
  const searchedCourses = ref([])
  const isSearching = ref(false)
  const isEmptyResult = ref(false)
  
  function search(str) {
    isEmptyResult.value = false
    searchedCourses.value = []
    isSearching.value = true
    courses.search(str).then((courses) => {
      isSearching.value = false
      if (courses.length === 0) isEmptyResult.value = true
      searchedCourses.value = courses
      return
    })
  }

  function clearSearch() {
    searchedCourses.value = []
    isSearching.value = false
    isEmptyResult.value = false
  }

  return {
    isEmptyResult,
    search,
    searchedCourses,
    isSearching,
    clearSearch
  }
}

export function useCourseList({ statusList = [] } = {}) {
  const isLoading = ref(false)
  const courseList = ref([])

  function getCourses() {
    isLoading.value = true
    courses.getCourses({ statusList }).then((courses) => {
      isLoading.value = false
      courseList.value = courses
    })
  }

  return { isLoading, courseList, getCourses }
}

export function useCourses() {
  const course = ref(null)
  function getCourse(id) {
    courses.getCourse(id).then((data) => (course.value = data))
  }

  const lessons = ref([])
  function getCourseLessons(courseId) {
    courses.getCourseLessons(courseId).then((data) => (lessons.value = data))
    const { deleteProgress } = useProgressStore()
    lessons.value.forEach((lesson) => {
      if (lesson.is_completed) deleteProgress(lesson.id + lesson.video)
    })
  }

  const lesson = ref(null)
  function getLesson(id) {
    courses.getLesson(id).then((data) => (lesson.value = data))
  }

  const tests = ref([])
  function getTests(courseId) {
    courses.getTests(courseId).then((data) => (tests.value = data))
  }

  return {
    course,
    getCourse,
    lessons,
    getCourseLessons,
    tests,
    getTests,
    lesson,
    getLesson
  }
}

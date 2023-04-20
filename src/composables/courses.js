import { ref } from 'vue'
import courses from '../services/courseService.js'

export function usePagination() {
  const isLoading = ref(false)
  const list = ref([])
  const page = ref(1)
  const hasNextPage = ref(false)

  return { isLoading, list, page, hasNextPage }
}
export function useSearchCourses(text) {
  const { isLoading, list, page, hasNextPage } = usePagination()
  const isEmptyResult = ref(false)

  function search() {
    isEmptyResult.value = false
    isLoading.value = true
    const options = { text, page: page.value }
    courses.search(options).then((data) => {
      isLoading.value = false
      if (data.data.length === 0 && page.value === 1) return (isEmptyResult.value = true)
      list.value.push(...data.data)
      page.value++
      hasNextPage.value = !!data.links.next
    })
  }

  search()

  function clearSearch() {
    list.value = []
    isLoading.value = false
    isEmptyResult.value = false
  }
  return {
    isEmptyResult,
    search,
    courseList: list,
    isLoading,
    clearSearch,
    hasNextPage
  }
}

export function useCourseList({ statusList = [] } = {}) {
  const { isLoading, list, page, hasNextPage } = usePagination()

  function getCourses() {
    isLoading.value = true
    const params = { statusList, page: page.value }
    courses.getCourses(params).then((data) => {
      isLoading.value = false
      list.value.push(...data.data)
      page.value++
      hasNextPage.value = !!data.links.next
    })
  }
  getCourses()

  return { isLoading, courseList: list, getCourses, hasNextPage }
}

export function useLessonList(courseId) {
  const { isLoading, list, page, hasNextPage } = usePagination()

  function getLessons() {
    isLoading.value = true
    courses.getCourseLessons(courseId, page.value).then((data) => {
      isLoading.value = false
      list.value.push(...data.data)
      page.value++
      hasNextPage.value = !!data.links.next
    })
  }
  getLessons()

  return { isLoading, lessonList: list, getLessons, hasNextPage }
}

export function useCourses() {
  const course = ref(null)
  function getCourse(id) {
    courses.getCourse(id).then((data) => (course.value = data))
  }

  const lesson = ref(null)
  function getLesson(id) {
    courses.getLesson(id).then((data) => (lesson.value = data))
  }

  const tests = ref([])
  function getTests(courseId) {
    return courses.getTests(courseId).then((data) => {
      if (data.R !== 'E') return (tests.value = data)
      return Promise.reject(data.msg)
    })
  }

  return {
    course,
    getCourse,
    tests,
    getTests,
    lesson,
    getLesson
  }
}

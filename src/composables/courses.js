import { ref } from 'vue'
import courses from '../services/courseService.js'
import { useProgressStore } from '../stores/progress.js'
export function useCourses() {
  const searchedCourses = ref([])
  function search(str) {
    courses.search(str).then((courses) => (searchedCourses.value = courses))
  }

  const allCourses = ref([])
  function getAll() {
    courses.getCourses().then((courses) => (allCourses.value = courses))
  }

  const myCourses = ref([])
  function getMyCourses() {
    courses.getMyCourses().then((courses) => (myCourses.value = courses))
  }

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
    searchedCourses,
    search,
    allCourses,
    getAll,
    myCourses,
    getMyCourses,
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

import { ref } from 'vue'
import courses from '../services/courseService.js'
export function useCourses() {
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
  }

  const tests = ref([])
  function getTests(courseId) {
    courses.getTests(courseId).then((data) => (tests.value = data))
  }

  return {
    allCourses,
    getAll,
    myCourses,
    getMyCourses,
    course,
    getCourse,
    lessons,
    getCourseLessons,
    tests,
    getTests
  }
}

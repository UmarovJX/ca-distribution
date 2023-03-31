import { ref } from 'vue'
import courses from '../services/courseService.js'
export function useCourses() {
  const allCourses = ref(null)
  const myCourses = ref(null)
  const course = ref(null)

  function getCource(id) {
    courses.getCource(id).then((data) => course.value =data)
  }

  function getAll() {
    courses.getCourses().then((courses) => (allCourses.value = courses))
  }

  function getMyCourses() {
    courses.getMyCourses().then((courses) => (myCourses.value = courses))
  }

  return { allCourses, myCourses, course, getAll, getMyCourses, getCource }
}

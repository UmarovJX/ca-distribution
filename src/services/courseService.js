import axios from './axios'
const courseURL = 'telegram/course/course'
const lessonsURL = 'telegram/course/lesson'
const testURL = 'telegram/course/test'
function startCourse(course_id) {
  return axios.postForm(courseURL + `/start`, { course_id })
}

function completeLesson(lesson_id) {
  return axios.postForm(lessonsURL + `/complete`, { lesson_id })
}

function search(options = { page: 1 }) {
  const params = { 'filter[name]': options.text }
  params.page = options.page
  params['page-size'] = 1

  return axios.get(courseURL, { params }).then((response) => response.data)
}

function getCourses(options = { statusList: [], page: 1 }) {
  const params = {}
  options.statusList.forEach((status, i) => {
    params[`filter[education_course.status][${{ i }}]`] = status
  })
  params.page = options.page
  params['page-size'] = 1
  return axios.get(courseURL, { params }).then((response) => response.data)
}

function getCourseLessons(courseId, page) {
  return axios
    .get(lessonsURL, { params: { 'filter[course_id]': courseId, page, 'page-size': 4 } })
    .then((response) => response.data)
}
function getCourse(id) {
  return axios.get(courseURL + `/${id}`).then((response) => response.data)
}

function getLesson(id) {
  return axios.get(lessonsURL + `/${id}`).then((response) => response.data)
}

function getTests(course_id) {
  const params = {
    course_id
  }
  return axios.get(testURL + `/list`, { params }).then((response) => response.data)
}

function submitTest(answers, id) {
  const data = { answers }
  return axios.postForm(testURL + `/submit?course_id=${id}`, data).then((response) => {
    console.log(response)
    return response.data
  })
}
export default {
  search,
  getCourses,
  getCourse,
  startCourse,
  getCourseLessons,
  getTests,
  submitTest,
  getLesson,
  completeLesson
}

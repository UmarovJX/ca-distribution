import axios from './axios'
const courseURL = 'telegram/course/course'
const lessonsURL = 'telegram/course/lesson'

function getCourse(id) {
  return axios.get(courseURL + `/${id}`).then((response) => response.data)
}

function search(text) {
  return axios
    .get(courseURL, { params: { 'filter[name]': text } })
    .then((response) => response.data.data)
}
search('course')

function getCourses() {
  return axios.get(courseURL).then((response) => response.data.data)
}

function getMyCourses() {
  return axios
    .get(courseURL, {
      params: {
        'filter[education_course.status][0]': 'active',
        'filter[education_course.status][1]': 'completed'
      }
    })
    .then((response) => response.data.data)
}

function getCourseLessons(courseId) {
  return axios
    .get(lessonsURL, { params: { 'filter[course_id]': courseId } })
    .then((response) => response.data.data)
}

function getLesson(id) {
  return axios.get(lessonsURL + `/${id}`).then((response) => response.data)
}

function getTests(courseId) {
  //Mock
  courseId
  return Promise.resolve([
    {
      id: 2,
      question: {
        ru: 'Question 2 ru',
        uz: 'Question 2 uz'
      },
      options: [
        {
          id: '84ce3b5e-11ad-42b5-9a85-89f34a3d580a|6427036d52cf5',
          name: {
            ru: 'Option 2-1 ru',
            uz: 'Option 2-1 uz'
          }
        },
        {
          id: '51bb5a96-7464-4879-b9d8-efc815318725|6427036d52cfb',
          name: {
            ru: 'Option 2-2 ru',
            uz: 'Option 2-2 uz'
          }
        }
      ]
    },
    {
      id: 1,
      question: {
        ru: 'Question 1 ru',
        uz: 'Question 1 uz'
      },
      options: [
        {
          id: '41620e00-99c1-4d15-9a18-6385d75eb2a0|6427036d52ce1',
          name: {
            ru: 'Option 1-1 ru',
            uz: 'Option 1-1 uz'
          }
        },
        {
          id: '503532e0-a742-44c2-bed7-9a70219f5f8b|6427036d52ced',
          name: {
            ru: 'Option 1-2 ru',
            uz: 'Option 1-2 uz'
          }
        }
      ]
    }
  ])
}

function submitTest(data) {
  data
  if (Math.random() > 0.5) {
    return Promise.resolve({
      meta: {
        is_passed: false,
        attempts_left: 2,
        total_quantity: 2,
        correct_quantity: 0
      },
      result: {
        qwe: false,
        asd: false
      }
    })
  } else {
    return Promise.resolve({
      meta: {
        is_passed: true,
        attempts_left: 2,
        total_quantity: 2,
        correct_quantity: 2
      },
      result: {
        '23133c72-276d-44e2-a070-61e05bf19aa8|6427036de5ce5': true,
        'be3df5a3-553d-4e93-979c-4cec5dd621e5|6427036de5d00': true
      }
    })
  }
}
export default {
  search,
  getCourses,
  getMyCourses,
  getCourse,
  getCourseLessons,
  getTests,
  submitTest,
  getLesson
}

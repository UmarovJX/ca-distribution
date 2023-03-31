import axios from './axios'
const courseURL = 'telegram/course/course'

function getCource(id) {
  return axios.get(courseURL + `/${id}`).then((response) => response.data)
}

function getCourses() {
  return axios.get(courseURL).then((response) => response.data.data)
}

function getMyCourses() {
  return axios.get(courseURL).then((response) => response.data.data)
}
export default { getCourses, getMyCourses, getCource }

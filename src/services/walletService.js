import axios from './axios'
const wallet url = 'telegram/batch/course'

function getCourse(id) {
  return axios.get(courseURL + `/${id}`).then((response) => response.data)
}


export default {

}

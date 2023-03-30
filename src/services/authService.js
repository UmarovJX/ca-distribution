import axios from './axios.js'

function signIn(username, password) {
  axios
    .post('common/auth/login', { password, username }, { withCredentials: true })
    .then((response) => console.log(response))
}

export default { signIn }

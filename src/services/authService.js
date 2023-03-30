import axios from './axios.js'

function signIn(username, password) {
  axios
    .postForm('common/auth/login', { password, username }, { withCredentials: false })
    .then((response) => console.log(response))
}

export default { signIn }

import axios from './axios'
const qrUrl = 'telegram/batch/product/sell'

function submitQRCodeString(str) {
  return axios.postForm(qrUrl, { qr_code_string: str }).then((response) => response.data)
}

export default { submitQRCodeString }

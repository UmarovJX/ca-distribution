import axios from './axios'
const walletURL = 'telegram/user/transaction'

function getTransactions({ tType, page }) {
  const params = { page }
  params['page-size'] = 5

  if (tType) params['filter[type]'] = tType
  return axios.get(walletURL, params).then((response) => response.data)
}

export default { getTransactions }

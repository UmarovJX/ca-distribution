import { usePagination } from './courses'
import walletService from '../services/walletService'

export function useTransactionList(tType) {
  const { isLoading, list, page, hasNextPage } = usePagination()

  function getTransactions() {
    isLoading.value = true
    const params = { page: page.value }
    if (tType) params.tType = tType
    walletService.getTransactions(params).then((data) => {
      isLoading.value = false
      list.value.push(...data.data)
      page.value++
      hasNextPage.value = !!data.links.next
    })
  }
  getTransactions()

  return { isLoading, transactionList: list, getTransactions, hasNextPage }
}

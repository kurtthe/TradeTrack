import {useQuery} from 'react-query';
import {queryKey, getTransaction} from './transaction.service'

export const useGetTransactions = (
  options
)=> useQuery({
  queryKey: queryKey.queryKey,
  queryFn: () => getTransaction(options),
})
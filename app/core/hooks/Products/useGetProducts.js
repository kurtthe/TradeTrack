import {useQuery} from 'react-query';
import {queryKey, getProducts} from './products.service'

export const useGetProducts = (
  options
)=> useQuery({
  queryKey: queryKey.queryKey,
  queryFn: () => getProducts(options),
})
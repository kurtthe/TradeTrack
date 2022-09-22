import {useQuery} from 'react-query';
import {queryKey, getStores} from './stores.service'

export const useGetStores = ()=> useQuery({
  queryKey: queryKey.get_stores,
  queryFn: () => getStores(),
  cacheTime: 30 * 60 * 1000,
})
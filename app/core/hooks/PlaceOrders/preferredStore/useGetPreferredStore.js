import {useQuery} from 'react-query';
import {queryKey, getPreferredStores} from './preferred.service'

export const useGetPreferredStore = ()=> useQuery({
  queryKey: queryKey.get_preferred_stores,
  queryFn: () => getPreferredStores(),
  cacheTime: 30 * 60 * 1000,
})
import { useQuery } from 'react-query';
import { queryKey, getCategories } from './categories.service'

export const useGetCategories = () => useQuery({
  queryKey: queryKey.queryKey,
  queryFn: () => getCategories(),
})
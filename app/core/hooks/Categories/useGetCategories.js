import { useQuery } from 'react-query';
import { queryKey, getCategories } from './categories.service'

export const useGetCategories = (
  options
) => useQuery({
  queryKey: queryKey.queryKey,
  queryFn: async () => {
    return await getCategories(options)
  }
})
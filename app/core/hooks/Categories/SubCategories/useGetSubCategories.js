import { useQuery } from 'react-query';
import { queryKey, getSubCategories } from './subCategories.service'

export const useGetSubCategories = (
  idCategory,
) => useQuery({
  queryKey: queryKey.queryKey,
  queryFn: () => {
    return getSubCategories(idCategory)
  }
}) 
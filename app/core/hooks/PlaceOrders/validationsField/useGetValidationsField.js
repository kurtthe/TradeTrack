import {useQuery} from 'react-query';
import {queryKey, getValidationsFields} from './validationsField.service'

export const useGetValidationsField = ()=> useQuery({
  queryKey: queryKey.get_validations_fields,
  queryFn: () => getValidationsFields(),
})
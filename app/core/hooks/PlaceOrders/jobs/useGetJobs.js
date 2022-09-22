import {useQuery} from 'react-query';
import {queryKey, getJobs} from './jobs.service'

export const useGetJobs = (textSearch, page)=> useQuery({
  queryKey: queryKey.get_jobs,
  queryFn: () => getJobs(textSearch, page),
})
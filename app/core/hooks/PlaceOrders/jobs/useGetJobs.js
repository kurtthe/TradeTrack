import {useQuery} from 'react-query';
import {queryKey, getJobs} from './jobs.service'

export const useGetJobs = ()=> useQuery({
  queryKey: queryKey.get_jobs,
  queryFn: () => getJobs(),
  cacheTime: 30 * 60 * 1000,
})
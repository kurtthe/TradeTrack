import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

const generalRequestService = GeneralRequestService.getInstance()

export const getJobs = async (textSearch = '', page=1)=> {
  const response = await generalRequestService.get(endPoints.jobs, {
    params: {
      search: textSearch,
      page
    },
  })
  return Promise.resolve(response)
}

export const queryKey = {
  get_jobs: 'get_jobs'
}
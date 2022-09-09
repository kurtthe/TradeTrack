import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

const generalRequestService = GeneralRequestService.getInstance()

export const getJobs = async ()=> {
  const response = await generalRequestService.get(endPoints.jobs)
  return Promise.resolve(response)
}

export const queryKey = {
  get_jobs: 'get_jobs'
}
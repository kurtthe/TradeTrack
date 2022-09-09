import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

const generalRequestService = GeneralRequestService.getInstance()

export const getPreferredStores = async ()=> {
  const response = await generalRequestService.get(endPoints.preferredStore)
  return Promise.resolve(response)
}

export const queryKey = {
  get_preferred_stores: 'get_preferred_stores'
}
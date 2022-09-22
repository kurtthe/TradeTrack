import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

const generalRequestService = GeneralRequestService.getInstance()

export const getStores = async ()=> {
  const response = await generalRequestService.get(endPoints.stores)
  return Promise.resolve(response)
}

export const queryKey = {
  get_stores: 'get_stores'
}
import {GeneralRequestService} from '@core/services/general-request.service'
import {endPoints} from '@shared/dictionaries/end-points';

const generalRequestService = GeneralRequestService.getInstance()

export const getSupplierId = async () => {
  const response = await generalRequestService.get(endPoints.supplierId)
  return response.id
}

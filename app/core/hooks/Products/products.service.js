import { GeneralRequestService } from '@core/services/general-request.service'
import { endPoints } from '@shared/dictionaries/end-points';

const generalRequestService = GeneralRequestService.getInstance()

export const getProducts = async (options) => {
  const response = await generalRequestService.getWithHeaders(endPoints.products, {}, options)
  return Promise.resolve(response)
}

export const queryKey = {
  get_products: 'get_products'
}
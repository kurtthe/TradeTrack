import { GeneralRequestService } from '@core/services/general-request.service'
import { endPoints } from '@shared/dictionaries/end-points';

const generalRequestService = GeneralRequestService.getInstance()

export const getCategoriesService = async (options) => {
  const response = await generalRequestService.getWithHeaders(endPoints.categories, {},
    {
      expand: 'products'
    })

  return response
}

export const queryKey = {
  get_categories_products: 'get_categories_products'
}
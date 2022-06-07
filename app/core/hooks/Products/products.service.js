import { GeneralRequestService } from '@core/services/general-request.service'
import { endPoints } from '@shared/dictionaries/end-points';

const generalRequestService = GeneralRequestService.getInstance()

export const getProducts = async (options) => {
  const { category_id, page } = options

  const paramsPetition = {
    page
  }

  if (options.category_id) {
    paramsPetition['category_id'] = category_id
  }

  console.log("=>paramsPetition", paramsPetition)

  const response = await generalRequestService.getWithHeaders(endPoints.products, {},
    {
      'per-page': 20,
      ...paramsPetition
    })
  return Promise.resolve(response)
}

export const queryKey = {
  get_products: 'get_products'
}
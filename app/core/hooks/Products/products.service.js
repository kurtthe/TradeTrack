import { GeneralRequestService } from '@core/services/general-request.service'
import { endPoints } from '@shared/dictionaries/end-points';

const generalRequestService = GeneralRequestService.getInstance()

const getSupplierId = async () => {
  const response = await generalRequestService.get(endPoints.supplierId)
  return response.id
}

export const getProducts = async (options) => {
  const { category_id, page, search } = options
  const supplierId = await getSupplierId()

  const paramsPetition = {
    page
  }

  if (options.category_id) {
    paramsPetition['category_id'] = category_id
  }
  if (options.search) {
    paramsPetition['search'] = search
  }

  const response = await generalRequestService.getWithHeaders(endPoints.products, {},
    {
      'per-page': 20,
      supplier_id: supplierId,
      update_prices: true,
      ...paramsPetition
    })
  return Promise.resolve(response)
}

export const queryKey = {
  get_products: 'get_products'
}
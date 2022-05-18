import { GeneralRequestService } from '@core/services/general-request.service'
import { endPoints } from '@shared/dictionaries/end-points';

const generalRequestService = GeneralRequestService.getInstance()

export const getSubCategories = async (idCategory) => {

  if (idCategory === undefined) {
    return Promise.resolve()
  }

  const response = await generalRequestService.getWithHeaders(endPoints.subcategories, {},
    {
      'per-page': 20,
      'expand': 'products',
      'parent_category_id': idCategory,
    })
  return Promise.resolve(response)
}

export const queryKey = {
  get_sub_categories_products: 'get_sub_categories_products'
}
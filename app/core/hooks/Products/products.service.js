import {GeneralRequestService} from '@core/services/general-request.service'
import {endPoints} from '@shared/dictionaries/end-points';
//import {getSupplierId} from '../getSupplierId.service'
const generalRequestService = GeneralRequestService.getInstance()

export const getProducts = async (options) => {
  const {category_id, page, search, only_favourite} = options
  //const supplierId = await getSupplierId()
  const paramsPetition = {
    page
  }
  const isPools = category_id === "Pools"
  if (category_id && !isPools) {
    paramsPetition['category_id'] = category_id
  }
  if (options.search || isPools) {
    paramsPetition['search'] = isPools ? category_id: search
  }

  const response = await generalRequestService.getWithHeaders(endPoints.products, {},
    {
      'per-page': 20,
      update_prices: true,
      favourites_only: only_favourite || false,
      expand: 'price',
      //supplier_id: supplierId,
      ...paramsPetition
    })

  return Promise.resolve(response)
}

export const queryKey = {
  get_products: 'get_products'
}

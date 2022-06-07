import { GeneralRequestService } from '@core/services/general-request.service'
import { endPoints } from '@shared/dictionaries/end-points';

const generalRequestService = GeneralRequestService.getInstance()

export const getCategoriesService = async () => {
  const response = await generalRequestService.getWithHeaders(endPoints.categories, {},
    {
      expand: 'sub_categories',
    })

  return Promise.resolve(response.body)
}

export const queryKey = {
  get_categories: 'get_categories'
}
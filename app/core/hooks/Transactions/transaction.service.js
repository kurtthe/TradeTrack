import { GeneralRequestService } from '@core/services/general-request.service'
import { endPoints } from '@shared/dictionaries/end-points';

const generalRequestService = GeneralRequestService.getInstance()

export const getTransaction = async (options) => {
  const { search, type, start_date, end_date, page } = options

  const paramsPetition = {
    page
  }

  if (search) {
    paramsPetition['search'] = search
  }
  if (type) {
    paramsPetition['type'] = type
  }
  if (start_date) {
    paramsPetition['start_date'] = start_date
  }
  if (end_date) {
    paramsPetition['end_date'] = end_date
  }

  const response = await generalRequestService.getWithHeaders(endPoints.searchInvoices, {},
    {
      'per-page': 20,
      ...paramsPetition
    })

  return Promise.resolve(response)
}


export const queryKey = {
  get_transactions: 'get_transactions'
}

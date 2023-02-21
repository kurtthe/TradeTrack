import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

const generalRequestService = GeneralRequestService.getInstance()

export const getValidationsFields = async ()=> {
  const response = await generalRequestService.get(endPoints.getValidationRules, {
    headers: {
      'ttrak-key': 'tt_V2b9S3qOBmckbR2jLWIg35'
    }
  })
  console.log("=>response", response)
  return Promise.resolve(response)
}

export const queryKey = {
  get_validations_fields: 'get_validations_fields'
}
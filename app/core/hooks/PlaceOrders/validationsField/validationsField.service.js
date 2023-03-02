import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

const generalRequestService = GeneralRequestService.getInstance();

export const getValidationsFields = async () => {
  const response = await generalRequestService.get(endPoints.getValidationRules, {});
  return Promise.resolve(response);
};

export const queryKey = {
  get_validations_fields: 'get_validations_fields',
};

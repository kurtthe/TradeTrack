import {GeneralRequestService} from '@core/services/general-request.service';
import {endPoints} from '@shared/dictionaries/end-points';

const generalRequestService = GeneralRequestService.getInstance();

export const getTemplatesService = async page => {
  const response = await generalRequestService.getWithHeaders(
    endPoints.templates,
    {
      params: {
        page,
        'per-page': 12,
        include_products: true,
        sort: 'id_desc',
      },
    },
  );
  const totalPages = parseInt(response.headers['x-pagination-page-count']) || 2;
  const dataToResponse = {
    templates: response.body,
    loadMore: page < totalPages,
  };

  return Promise.resolve(dataToResponse);
};

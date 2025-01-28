import {GeneralRequestService} from '@core/services/general-request.service';
import {endPoints} from '@shared/dictionaries/end-points';
import {getSupplierId} from '@core/hooks/getSupplierId.service';

const generalRequestService = GeneralRequestService.getInstance();

export const getTemplatesService = async page => {
  const supplierId = await getSupplierId();

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
    templates: response.body.filter(item => item.supplier_id == supplierId),
    loadMore: page < totalPages,
  };

  return Promise.resolve(dataToResponse);
};

export const getOrdersService = async page => {
  const supplierId = await getSupplierId();

  const responseOrders = await generalRequestService.getWithHeaders(
    endPoints.orders,
    {
      params: {
        page,
        'per-page': 12,
        include_products: true,
        sort: 'id_desc',
      },
    },
  );
  console.log('===>supplierId::', supplierId);
  const totalPages =
    parseInt(responseOrders.headers['x-pagination-page-count']) || 2;
  const dataToResponse = {
    templates: responseOrders.body.filter(
      item => item.supplier_id == supplierId,
    ),
    loadMore: page < totalPages,
  };

  return Promise.resolve(dataToResponse);
};

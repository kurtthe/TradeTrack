import {useQuery} from 'react-query';
import {getOrdersService} from './services';

export const useGetOrders = page =>
  useQuery({
    queryKey: ['getting-orders'],
    queryFn: () => getOrdersService(page),
  });

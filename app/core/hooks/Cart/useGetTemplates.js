import {useQuery} from 'react-query';
import {getTemplatesService} from './services';

export const useGetTemplates = page =>
  useQuery({
    queryKey: ['getting-templates'],
    queryFn: () => getTemplatesService(page),
  });

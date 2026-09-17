import { bbpUrl, client } from '@branch-services/client';
import { PaginatedData } from '@branch-services/types';

import { toServiceListPage } from './mappers';
import type {
  CreateServiceDto,
  ServiceItem,
  ServiceItemResponse,
  ServiceListParams,
  UpdateServiceParams,
} from '../utils/types';

// TODO: endpoints are not final yet, confirm them with backend before disabling the mock
const SERVICES_URL = `${bbpUrl}/calendar/service`;

const Api = {
  // The service pages are zero-based
  getServices: async ({ page, ...params }: ServiceListParams): Promise<PaginatedData<ServiceItem>> => {
    const response = await client.get<PaginatedData<ServiceItemResponse>>(`${SERVICES_URL}/list`, {
      params: { ...params, page: page - 1 },
    });
    return toServiceListPage(response.data);
  },
  createService: async (values: CreateServiceDto): Promise<void> => {
    await client.post<void>(`${SERVICES_URL}/create`, values);
  },
  updateService: async ({ id, ...values }: UpdateServiceParams): Promise<void> => {
    await client.put<void>(`${SERVICES_URL}/update/${id}`, values);
  },
};

export default Api;

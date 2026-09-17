import type { PaginatedData } from '@branch-services/types';

import type { ServiceItem, ServiceItemResponse } from '../utils/types';

// The service may send numeric ids; the UI keeps them as strings
export const toServiceListPage = (response: PaginatedData<ServiceItemResponse>): PaginatedData<ServiceItem> => ({
  ...response,
  content: response.content.map((service) => ({ ...service, id: String(service.id) })),
});

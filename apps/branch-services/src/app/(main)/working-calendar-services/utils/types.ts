export interface ServiceItem {
  id: string;
  persianName: string;
  englishName: string;
  active: boolean;
}

// Raw list row of the service, normalized by services/mappers.ts
export type ServiceItemResponse = Omit<ServiceItem, 'id'> & {
  id: string | number;
};

export type ServiceFormValues = Omit<ServiceItem, 'id'>;

export type CreateServiceDto = ServiceFormValues;

export type UpdateServiceParams = ServiceItem;

export type ServiceListFilter = {
  name?: string;
};

export type ServicePagination = {
  // One-based, as shown in the table
  page: number;
  size: number;
};

export type ServiceListParams = ServicePagination & ServiceListFilter;

export type ServiceModalType = 'create' | 'edit';

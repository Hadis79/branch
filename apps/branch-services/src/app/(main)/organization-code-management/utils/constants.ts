import { OrganizationCodeListQueryParams } from './types';

const ORGANIZATION_CODE_QUERY_KEY = 'organization-codes';

export const organizationCodeQueryKeys = {
  all: [ORGANIZATION_CODE_QUERY_KEY] as const,
  list: (params: OrganizationCodeListQueryParams) => [...organizationCodeQueryKeys.all, 'list', params] as const,
  name: (organizationCode: string) => [...organizationCodeQueryKeys.all, 'name', organizationCode] as const,
};

export const organizationCodeMutationKeys = {
  create: [ORGANIZATION_CODE_QUERY_KEY, 'create'] as const,
  update: [ORGANIZATION_CODE_QUERY_KEY, 'update'] as const,
  delete: [ORGANIZATION_CODE_QUERY_KEY, 'delete'] as const,
};

export const NATIONAL_CODE_LENGTH = 10;
export const NATIONAL_ID_LENGTH = 12;
export const ORGANIZATION_CODE_LENGTH = 6;
export const ACCOUNT_NUMBER_LENGTH = 13;

export const FORM_ITEM_NAMES = {
  ssn: 'ssn',
  organizationCode: 'organizationCode',
  accountNumber: 'accountNumber',
} as const;

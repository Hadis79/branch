import { MessageModel } from '@branch-services/types';

export type OrganizationCodeView = 'list' | 'create-form' | 'create-review' | 'create-success';

export interface OrganizationCodeRequestDto {
  organizationCode: string;
  organizationName: string;
  ssn: string;
  accountNumber?: string;
}

export interface OrganizationCodeResponseDto {
  organizationCodeUUID: string;
  organizationCode: string;
  organizationName?: string;
  ssn: string;
  accountNumber?: string;
}

export type OrganizationCodeFormValues = OrganizationCodeRequestDto;

export interface OrganizationCodeUpdateDto {
  organizationCode: string;
  accountNumber: string;
}

export interface OrganizationCodeUpdateFormValues {
  organizationCode: string;
  organizationName?: string;
  accountNumber?: string;
  ssn?: string;
}
export type OrganizationCodeRow = OrganizationCodeResponseDto;

export interface SortDto {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface PageableDto {
  sort: SortDto;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}

export interface PageDtoOrganizationCodeResponseDto {
  content: OrganizationCodeResponseDto[];
  pageable: PageableDto;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: SortDto;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface OrganizationCodePagination {
  page: number;
  size: number;
}

export interface OrganizationCodeFilters {
  ssn?: string;
  organizationCode?: string;
}

export interface OrganizationCodeListQueryParams {
  page: number;
  size: number;
  ssn?: string;
  organizationCode?: string;
}

export interface OrganizationNameQueryParams {
  organizationCode: string;
}

export interface UpdateOrganizationCodeVariables {
  organizationCodeUUID: string;
  values: OrganizationCodeUpdateDto;
}

export interface DeleteOrganizationCodeVariables {
  organizationCodeUUID: string;
  previousPage?: number;
}

export type OrganizationCodeModal = 'edit' | 'delete' | null;
export type OrganizationCodeMessage = MessageModel;

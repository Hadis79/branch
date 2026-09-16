import { ApiUtil } from '@branch-services/utils';
import {
  OrganizationCodeFormValues,
  OrganizationCodeFilters,
  OrganizationCodeListQueryParams,
  OrganizationCodeMessage,
  OrganizationCodePagination,
  OrganizationCodeRequestDto,
  OrganizationCodeUpdateDto,
  OrganizationCodeUpdateFormValues,
} from './types';
import { NATIONAL_CODE_LENGTH, NATIONAL_ID_LENGTH } from './constants';

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

export const normalizeDigits = (value = '') =>
  value
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_DIGITS.indexOf(digit)));

export const normalizeFormValues = (values: OrganizationCodeFormValues): OrganizationCodeFormValues => ({
  ssn: normalizeDigits(values.ssn).trim(),
  organizationCode: normalizeDigits(values.organizationCode).trim(),
  organizationName: values.organizationName?.trim() ?? '',
  accountNumber: normalizeDigits(values.accountNumber).trim() || undefined,
});

export const toOrganizationCodeRequestDto = ({
  ssn,
  organizationCode,
  organizationName,
  accountNumber,
}: OrganizationCodeFormValues): OrganizationCodeRequestDto => ({
  ssn,
  organizationCode,
  organizationName,
  accountNumber,
});

export const toOrganizationCodeUpdateDto = ({
  organizationCode,
  accountNumber,
}: OrganizationCodeUpdateFormValues): OrganizationCodeUpdateDto => ({
  organizationCode: normalizeDigits(organizationCode).trim(),
  accountNumber: normalizeDigits(accountNumber).trim(),
});

export const isValidNationalIdLength = (value?: string) => {
  const length = normalizeDigits(value).length;

  return [10, 11, 12].includes(length);
};

export const getOrganizationCodeListParams = (
  pagination: OrganizationCodePagination,
  filter: OrganizationCodeFilters
): OrganizationCodeListQueryParams => ({
  page: pagination.page - 1,
  size: pagination.size,
  ...(filter.ssn ? { ssn: filter.ssn } : {}),
  ...(filter.organizationCode ? { organizationCode: filter.organizationCode } : {}),
});

export const getOrganizationCodeErrorMessage = (error: unknown): OrganizationCodeMessage =>
  ApiUtil.getErrorMessage(error) as OrganizationCodeMessage;

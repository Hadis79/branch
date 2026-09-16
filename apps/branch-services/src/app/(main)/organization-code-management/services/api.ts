import { bbpUrl, client } from '@branch-services/client';
import {
  OrganizationCodeListQueryParams,
  OrganizationCodeRequestDto,
  OrganizationCodeResponseDto,
  OrganizationCodeUpdateDto,
  OrganizationNameQueryParams,
  PageDtoOrganizationCodeResponseDto,
} from '../utils/types';

const ORGANIZATION_CODE_ASSIGNMENT_URL = `${bbpUrl}/organization-code-assignment`;
const ORGANIZATION_CODE_HISTORY_URL = `${ORGANIZATION_CODE_ASSIGNMENT_URL}/history`;

const Api = {
  getOrganizationCodes: async (
    params: OrganizationCodeListQueryParams
  ): Promise<PageDtoOrganizationCodeResponseDto> => {
    const response = await client.get<PageDtoOrganizationCodeResponseDto>(ORGANIZATION_CODE_HISTORY_URL, {
      params,
      paramsSerializer: { indexes: null },
    });
    return response.data;
  },

  createOrganizationCode: async (values: OrganizationCodeRequestDto): Promise<OrganizationCodeResponseDto> => {
    const response = await client.post<OrganizationCodeResponseDto>(ORGANIZATION_CODE_ASSIGNMENT_URL, values);
    return response.data;
  },

  getOrganizationName: async ({ organizationCode }: OrganizationNameQueryParams): Promise<string> => {
    const response = await client.get<string>(
      `${ORGANIZATION_CODE_ASSIGNMENT_URL}/${encodeURIComponent(organizationCode)}/name`
    );
    return response.data;
  },

  updateOrganizationCode: async (
    organizationCodeUUID: string,
    values: OrganizationCodeUpdateDto
  ): Promise<OrganizationCodeResponseDto> => {
    const response = await client.patch<OrganizationCodeResponseDto>(
      `${ORGANIZATION_CODE_ASSIGNMENT_URL}/${organizationCodeUUID}`,
      values
    );
    return response.data;
  },

  deleteOrganizationCode: async (organizationCodeUUID: string): Promise<void> => {
    await client.delete(`${ORGANIZATION_CODE_ASSIGNMENT_URL}/${organizationCodeUUID}`);
  },
};

export default Api;

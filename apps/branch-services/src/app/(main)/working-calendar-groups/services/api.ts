import { client, bbpUrl } from '@branch-services/client';
import { PaginatedData } from '@branch-services/types';

import type { GroupListQueryParams } from '../utils/param-util';
import {
  GroupFileUploadResponse,
  GroupListItem,
  GroupRequestDto,
  GroupUnit,
  UploadGroupFileParams,
} from '../utils/types';
const GROUPS_URL = `${bbpUrl}/calendar/group`;
const UNIT_LIST_URL = `${bbpUrl}/calendar/unit-list`;

const Api = {
  getUnitList: async (): Promise<GroupUnit[]> => {
    const response = await client.get<GroupUnit[]>(UNIT_LIST_URL);
    return response.data;
  },
  getGroupsHistory: async (params: GroupListQueryParams): Promise<PaginatedData<GroupListItem>> => {
    const response = await client.get<PaginatedData<GroupListItem>>(`${GROUPS_URL}/list`, {
      params,
      paramsSerializer: { indexes: null },
    });
    return response.data;
  },
  createGroups: async (values: GroupRequestDto): Promise<number> => {
    const response = await client.post<void>(`${GROUPS_URL}/create`, values);
    return response.status;
  },
  removeGroups: async (id: string): Promise<number> => {
    const response = await client.delete<void>(`${GROUPS_URL}/remove/${id}`);
    return response.status;
  },
  uploadFile: async ({ file }: UploadGroupFileParams): Promise<GroupFileUploadResponse> => {
    const response = await client.post<GroupFileUploadResponse>(
      `${GROUPS_URL}/upload-file`,
      { file },
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    );

    return response.data;
  },
};
export default Api;

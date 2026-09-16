import { client, bbpUrl } from '@branch-services/client';
import { PaginatedData } from '@branch-services/types';
import { ApiUtil } from '@branch-services/utils';

import type { GroupListQueryParams } from '../utils/param-util';
import { toUploadedGroupFile } from './mappers';
import {
  DownloadedFile,
  GroupFileUploadResponse,
  GroupListItem,
  GroupRequestDto,
  GroupUnit,
  GroupUnitsParams,
  UpdateGroupParams,
  UploadGroupFileParams,
  UploadedGroupFile,
} from '../utils/types';

const GROUPS_URL = `${bbpUrl}/calendar/group`;
const UNIT_LIST_URL = `${bbpUrl}/calendar/unit-list`;
const EXCEL_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

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
  createGroups: async (values: GroupRequestDto): Promise<void> => {
    await client.post<void>(`${GROUPS_URL}/create`, values);
  },
  // The service pages are zero-based
  getGroupUnits: async ({ id, page, size }: GroupUnitsParams): Promise<PaginatedData<GroupUnit>> => {
    const response = await client.get<PaginatedData<GroupUnit>>(`${GROUPS_URL}/${id}`, {
      params: { page: page - 1, size },
    });
    return response.data;
  },
  // The (possibly renamed) group name goes in the query and the complete unit list in the body
  updateGroup: async ({ id, name, units }: UpdateGroupParams): Promise<void> => {
    await client.put<void>(`${GROUPS_URL}/update/${id}`, { units }, { params: { name } });
  },
  removeGroups: async (id: string): Promise<void> => {
    await client.delete<void>(`${GROUPS_URL}/remove/${id}`);
  },
  // TODO: endpoint is not final yet, confirm with backend before disabling the mock
  downloadSampleFile: async (): Promise<DownloadedFile> => {
    const data = (await ApiUtil.getFile(`${GROUPS_URL}/sample-file`)) as Blob;
    return { data, type: EXCEL_MIME_TYPE, fileName: 'group-units-sample.xlsx' };
  },
  uploadFile: async ({ file }: UploadGroupFileParams): Promise<UploadedGroupFile> => {
    const response = await client.post<GroupFileUploadResponse>(
      `${GROUPS_URL}/upload-file`,
      { file },
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    );

    return toUploadedGroupFile(response.data);
  },
};
export default Api;

import { bbpUrl, client } from '@branch-services/client';
import { PaginatedData } from '@branch-services/types';
import { ApiUtil } from '@branch-services/utils';

import { toStringIds, toUploadedHolidayFile } from './mappers';
import type {
  CreateOfficialHolidaysDto,
  CustomHoliday,
  CustomHolidayResponse,
  CustomListParams,
  DownloadedFile,
  HolidayFileUploadResponse,
  NewCustomHoliday,
  OfficialHoliday,
  OfficialListParams,
  OfficialYear,
  OfficialYearResponse,
  Region,
  UploadedHolidayFile,
} from '../utils/types';

// TODO: endpoints are not final yet, confirm them with backend before disabling the mock
const HOLIDAY_URL = `${bbpUrl}/calendar/holiday`;
const EXCEL_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

// The service pages are zero-based
const toServicePage = <T extends { page: number }>({ page, ...params }: T) => ({ ...params, page: page - 1 });

const downloadExcel = async (url: string, fileName: string): Promise<DownloadedFile> => ({
  data: (await ApiUtil.getFile(url)) as Blob,
  type: EXCEL_MIME_TYPE,
  fileName,
});

const Api = {
  getRegions: async (): Promise<Region[]> => (await client.get<Region[]>(`${HOLIDAY_URL}/regions`)).data,

  getOfficialYears: async (params: OfficialListParams): Promise<PaginatedData<OfficialYear>> => {
    const response = await client.get<PaginatedData<OfficialYearResponse>>(`${HOLIDAY_URL}/official/list`, {
      params: toServicePage(params),
    });
    return toStringIds(response.data);
  },
  getOfficialHolidays: async (year: number): Promise<OfficialHoliday[]> =>
    (await client.get<OfficialHoliday[]>(`${HOLIDAY_URL}/official/${year}`)).data,
  downloadOfficialHolidays: (year: number): Promise<DownloadedFile> =>
    downloadExcel(`${HOLIDAY_URL}/official/${year}/file`, `holidays-${year}.xlsx`),
  downloadSampleFile: (): Promise<DownloadedFile> =>
    downloadExcel(`${HOLIDAY_URL}/official/sample-file`, 'holidays-sample.xlsx'),
  uploadOfficialFile: async (file: File): Promise<UploadedHolidayFile> => {
    const response = await client.post<HolidayFileUploadResponse>(
      `${HOLIDAY_URL}/official/upload-file`,
      { file },
      { headers: { 'content-type': 'multipart/form-data' } }
    );
    return toUploadedHolidayFile(response.data);
  },
  createOfficialHolidays: async (values: CreateOfficialHolidaysDto): Promise<void> => {
    await client.post<void>(`${HOLIDAY_URL}/official/create`, values);
  },

  getCustomHolidays: async (params: CustomListParams): Promise<PaginatedData<CustomHoliday>> => {
    const response = await client.get<PaginatedData<CustomHolidayResponse>>(`${HOLIDAY_URL}/custom/list`, {
      params: toServicePage(params),
    });
    return toStringIds(response.data);
  },
  createCustomHolidays: async (holidays: NewCustomHoliday[]): Promise<void> => {
    await client.post<void>(`${HOLIDAY_URL}/custom/create`, holidays);
  },
  deleteCustomHoliday: async (id: string): Promise<void> => {
    await client.delete<void>(`${HOLIDAY_URL}/custom/${id}`);
  },
};

export default Api;

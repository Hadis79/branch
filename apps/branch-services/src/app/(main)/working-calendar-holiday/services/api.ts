import { bbpUrl, client } from '@branch-services/client';
import { PaginatedData } from '@branch-services/types';
import { ApiUtil } from '@branch-services/utils';

import { toUploadedHolidayFile } from './mappers';
import type {
  CreateOfficialHolidaysDto,
  CustomHoliday,
  CustomHolidayResponse,
  CustomListFilter,
  DownloadedFile,
  HolidayFileUploadResponse,
  NewCustomHoliday,
  OfficialHoliday,
  OfficialListParams,
  OfficialYear,
  OfficialYearResponse,
  Province,
  UploadedHolidayFile,
} from '../utils/types';

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
  getProvinces: async (): Promise<Province[]> => (await client.get<Province[]>(`${HOLIDAY_URL}/province/list`)).data,

  // TODO: the official holidays service is not ready yet, these four are guesses
  getOfficialYears: async (filter: OfficialListParams): Promise<OfficialYear[]> => {
    const response = await client.get(`${HOLIDAY_URL}/official/list`, {
      params: filter,
    });
    return response.data;
  },
  // The list is not paginated, the table pages through it
  getOfficialHolidays: async (id: string): Promise<OfficialHoliday[]> => {
    const response = await client.get<OfficialHoliday[]>(`${HOLIDAY_URL}/official/${id}`);
    return response.data;
  },
  downloadOfficialHolidays: (year: number): Promise<DownloadedFile> =>
    downloadExcel(`${HOLIDAY_URL}/official/${year}/file`, `holidays-${year}.xlsx`),
  downloadSampleFile: (): Promise<DownloadedFile> =>
    downloadExcel(`${HOLIDAY_URL}/official/sample-file`, 'holidays-sample.xlsx'),

  // Uploading only parses the file; the rows are saved by createOfficialHolidays
  uploadOfficialFile: async (file: File): Promise<UploadedHolidayFile> => {
    const response = await client.post<HolidayFileUploadResponse>(
      `${HOLIDAY_URL}/upload-file`,
      { file },
      { headers: { 'content-type': 'multipart/form-data' } }
    );
    return toUploadedHolidayFile(response.data, file);
  },
  createOfficialHolidays: async (values: CreateOfficialHolidaysDto): Promise<void> => {
    await client.post<void>(`${HOLIDAY_URL}/upload-file/confirm`, values);
  },
  updateOfficialHolidays: async (values: CreateOfficialHolidaysDto): Promise<void> => {
    await client.post<void>(`${HOLIDAY_URL}/upload-file/confirm`, values);
  },

  // The list is not paginated, the table pages through it
  getCustomHolidays: async (filter: CustomListFilter): Promise<CustomHoliday[]> => {
    const response = await client.get<CustomHolidayResponse[]>(`${HOLIDAY_URL}/list`, { params: filter });
    return response.data;
  },
  createCustomHolidays: async (holidays: NewCustomHoliday[]): Promise<void> => {
    await client.post<void>(`${HOLIDAY_URL}/create`, holidays);
  },
  // TODO: the delete service is not ready yet, this one is a guess
  deleteCustomHoliday: async (id: string): Promise<void> => {
    await client.delete<void>(`${HOLIDAY_URL}/remove/${id}`);
  },
};

export default Api;

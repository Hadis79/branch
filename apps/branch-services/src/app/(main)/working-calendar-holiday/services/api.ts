import { bbpUrl, client } from '@branch-services/client';

import { toUploadedHolidayFile } from './mappers';
import type {
  CreateOfficialHolidaysDto,
  DeleteHolidayParams,
  Holiday,
  HolidayFileUploadResponse,
  HolidayListFilter,
  NewHoliday,
  Province,
  UploadedHolidayFile,
} from '../utils/types';

const HOLIDAY_URL = `${bbpUrl}/calendar/holiday`;
const Api = {
  getProvinces: async (): Promise<Province[]> => (await client.get<Province[]>(`${HOLIDAY_URL}/province/list`)).data,

  // The list is not paginated, the table pages through it
  getHolidays: async (filter: HolidayListFilter): Promise<Holiday[]> => {
    const response = await client.get<Holiday[]>(`${HOLIDAY_URL}/list`, { params: filter });
    return response.data;
  },
  // TODO: the edit service is not ready yet, the endpoint is a guess
  updateHoliday: async ({ id, ...values }: Holiday): Promise<void> => {
    await client.put<void>(`${HOLIDAY_URL}/update/${id}`, values);
  },
  deleteHoliday: async ({ provinceName, date }: DeleteHolidayParams): Promise<void> => {
    await client.delete<void>(`${HOLIDAY_URL}/unofficial/remove`, { params: { provinceName, date } });
  },

  // Uploading only parses the file; the rows are saved by createOfficialHolidays
  uploadOfficialFile: async (file: File): Promise<UploadedHolidayFile> => {
    const response = await client.post<HolidayFileUploadResponse>(
      `${HOLIDAY_URL}/upload-file`,
      { file },
      { headers: { 'content-type': 'multipart/form-data' } }
    );
    return toUploadedHolidayFile(response.data, file);
  },
  // TODO: the service still expects `year` and day / month rows; it has to take the rows of the list instead
  createOfficialHolidays: async (values: CreateOfficialHolidaysDto): Promise<void> => {
    await client.post<void>(`${HOLIDAY_URL}/upload-file/confirm`, values);
  },
  createCustomHolidays: async (holidays: NewHoliday[]): Promise<void> => {
    await client.post<void>(`${HOLIDAY_URL}/create`, holidays);
  },
};

export default Api;

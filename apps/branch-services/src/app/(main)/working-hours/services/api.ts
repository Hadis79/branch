import { bbpUrl, client } from '@branch-services/client';

import type { WorkingHours, WorkingHoursDto } from '../utils/types';

// TODO: the working-hours service is not ready yet, this base path and these endpoints are guesses
const WORKING_HOURS_URL = `${bbpUrl}/branch/working-hours`;

const Api = {
  // null while the bank's default working hours have not been defined yet
  getWorkingHours: async (): Promise<WorkingHours | null> => {
    const response = await client.get<WorkingHours | null>(WORKING_HOURS_URL);
    return response.data;
  },
  createWorkingHours: async (values: WorkingHoursDto): Promise<WorkingHours> => {
    const response = await client.post<WorkingHours>(WORKING_HOURS_URL, values);
    return response.data;
  },
  updateWorkingHours: async (values: WorkingHoursDto): Promise<WorkingHours> => {
    const response = await client.put<WorkingHours>(WORKING_HOURS_URL, values);
    return response.data;
  },
  deleteException: async (id: string): Promise<void> => {
    await client.delete<void>(`${WORKING_HOURS_URL}/exceptions/${id}`);
  },
};

export default Api;

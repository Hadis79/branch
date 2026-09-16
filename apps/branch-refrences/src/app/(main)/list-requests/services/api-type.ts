import { Dayjs } from '@branch-services/utils';

export interface DownloadExportFileParams {
  id: string;
  ssn: string;
  page?: number;
  size?: number;
}

export interface HistoryParams {
  accountNumber?: string;
  description?: string;
  fromAmount?: number;
  toAmount?: number;
  paymentType?: string;
  requestStatus?: string;
  ssn?: string;
  page?: number;
  size?: number;
  traceCode?: string;
  deposit_id?: string;
  fromDate?: string | Dayjs;
  toDate?: string | Dayjs;
  requestType?: string;
  depositType?: string;
}

export interface HistoryPaginationParams {
  count?: number;
  current?: number;
  page: number;
  size: number;
}

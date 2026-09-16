import { Statuses } from './consts';

export interface ApiParams extends TransactionKeys {
  page: number;
  requestType?: string;
  serviceUrl?: 'details' | 'inquiry-details';
  size: number;
  filter?: {
    destinationAccount?: string;
    ssn?: string;
    id?: string;
    status?: string;
    depositId?: string;
    tranceNumber?: string;
    fromAmount?: string;
    toAmount?: string;
    page?: string;
    size?: string;
  };
  ssn: string;
  id: string;
  destinationAccount?: string;
  status: Statuses;
  fromAmount?: string;
  toAmount?: string;
  depositId?: string;
  traceNumber?: string;
}

export interface Props {
  id: string;
  ssn: string;
  status?: string;
  serviceUrl: ApiParams['serviceUrl'];
  requestType?: string;
}

export interface TransactionKeys {
  ssn: string;
  id: string;
}

export interface DetailsHistoryResponse {
  ssn: string;
  id: string;
  destinationAccount?: string;
  status?: string;
  fromAmount?: string;
  toAmount?: string;
  depositId?: string;
  traceNumber?: string;
  page?: number;
  size?: number;
}

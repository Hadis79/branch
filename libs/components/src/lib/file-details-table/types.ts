export interface ApiParams extends TransactionKeys {
  page: number;
  serviceUrl?: 'details' | 'inquiry-details' | 'details-ach' | 'details-offline';
  size: number;
  uploadFile?: boolean;
  filter?: {
    destinationAccount?: string;
    status?: string;
  };
}

export interface Props {
  id: string;
  ssn: string;
  serviceUrl: ApiParams['serviceUrl'];
  uploadFile?: boolean;
  queryStatus?: boolean;
}

export interface TransactionKeys {
  ssn: string;
  id: string;
}

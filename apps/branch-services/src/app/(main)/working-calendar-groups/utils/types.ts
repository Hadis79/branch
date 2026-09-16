import type { UploadFile } from 'antd';

export interface GroupListItem {
  id: string;
  name: string;
  size: number;
}
export type GroupUnit = { name: string; code: string };

export interface AddGroupFormValues {
  name: string;
  units?: Array<{ label: string; value: string }>;
  file?: UploadFile[];
}

export type UploadGroupFileParams = {
  file: File;
};

export type GroupFileUploadResponse = {
  success?: boolean;
  fileName?: string;
  totalRecords?: number;
  unitCount?: number;
  size?: number;
  units?: GroupUnit[];
};

export interface GroupRequestDto {
  name: string;
  units: GroupUnit[];
}

export const toGroupRequestDto = ({ name, units = [] }: AddGroupFormValues): GroupRequestDto => ({
  name,
  units: units.map(({ label, value }) => ({ name: label, code: value })),
});

export interface HistoryParams {
  name: string;
  page?: number;
  size?: number;
}
export interface HistoryPaginationParams {
  count?: number;
  current?: number;
  page: number;
  size: number;
}

export type ModalType = 'remove' | 'edit' | null;

export type GroupModalType = 'edit' | 'remove';

export type OpenModalHandler = (type: GroupModalType, groupId: GroupListItem['id']) => void;

import type { UploadFile } from 'antd';

export interface GroupListItem {
  id: string;
  name: string;
  size: number;
}
export type GroupUnit = { name: string; code: string };

// Units are kept in the antd `labelInValue` shape: label = unit name, value = unit code
export type UnitOption = { label: string; value: string };

export interface GroupFormValues {
  name: string;
  units?: UnitOption[];
  file?: UploadFile[];
}

export type UploadGroupFileParams = {
  file: File;
};

// Raw response of the upload endpoint, normalized by services/mappers.ts
export type GroupFileUploadResponse = {
  success?: boolean;
  fileName?: string;
  totalRecords?: number;
  unitCount?: number;
  size?: number;
  units?: GroupUnit[];
};

export type UploadedGroupFile = {
  fileName?: string;
  units: GroupUnit[];
  unitCount: number;
};

export type DownloadedFile = {
  data: Blob;
  type: string;
  fileName: string;
};

export interface GroupRequestDto {
  name: string;
  units: GroupUnit[];
}

export interface GroupDetails extends GroupRequestDto {
  id: string;
}

export type UpdateGroupParams = GroupDetails;

export type GroupFormVariant = 'create' | 'edit';

export const toGroupRequestDto = ({ name, units = [] }: GroupFormValues): GroupRequestDto => ({
  name,
  units: units.map(({ label, value }) => ({ name: label, code: value })),
});

export type GroupModalType = 'edit' | 'remove';

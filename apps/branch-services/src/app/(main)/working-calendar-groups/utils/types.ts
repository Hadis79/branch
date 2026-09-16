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
  // Create form: the selected units
  units?: UnitOption[];
  file?: UploadFile[];
  // Edit form, manual mode: changes on top of the group's server-paginated units
  addedUnits?: UnitOption[];
  removedUnits?: RemovedUnit[];
}

export type RemovedUnit = {
  code: string;
  // Position in the server list, used to lay out the table pages
  index: number;
};

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

export interface UpdateGroupParams extends GroupRequestDto {
  id: string;
}

export type PageParams = {
  // One-based, as shown in the table
  page: number;
  size: number;
};

export type GroupUnitsParams = PageParams & {
  id: string;
};

export type GroupFormVariant = 'create' | 'edit';

export const toGroupRequestDto = ({ name, units = [] }: GroupFormValues): GroupRequestDto => ({
  name,
  units: units.map(({ label, value }) => ({ name: label, code: value })),
});

export type GroupModalType = 'edit' | 'remove';

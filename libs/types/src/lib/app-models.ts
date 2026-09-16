import { ReactNode } from 'react';
import { MenuType } from './app-enums';
import { SubErrorType } from './app-error';

export type AvatarModel = {
  image?: string;
  name?: string;
  role?: string;
  branch?: string;
};

export interface MenuModel {
  id: number;
  title: string;
  order: number;
  href: string;
  icon: string;
  active: boolean;
  description: string;
  parentId: number;
  children: MenuModel[];
  menuType: MenuType;
  accessScope: string;
  userType: string;
}

export type MessageModel = {
  txt: string;
  type: 'success' | 'info' | 'warning' | 'error';
  shouldTranslate: boolean;
  linkProps?: {
    title: string;
    url: string;
    // target?: LinkTargetType;
    icon?: ReactNode;
    samePath?: boolean;
  };
  subErrors?: SubErrorType[];
};

export type RouteModel = {
  path?: string;
  component?: ReactNode;
  exact?: boolean;
  protected?: boolean;
};

export interface Organization {
  orgSsn: string;
  orgName: string | undefined;
}

export interface UserModel {
  name: string;
  userInfo: UserInfo;
  userPersonalInfo: UserPersonalInfo;
  branchInfo: BranchInfo;
  jobInfo: JobInfo;
  jobStatusInfo: JobStatusInfo;
  clientSsn: string;
  orgName: string;
  organizations: Organization[];
}

interface JobStatusInfo {
  job_status_code: string;
  job_status_name: string;
  employed: boolean;
  bank_employed: boolean;
}

interface JobInfo {
  job_code: string;
  job_name: string;
}

interface BranchInfo {
  branch_code: string;
  sar_code: string;
  hozeh_code: string;
  hozeh_name: string;
  branch_name: string;
  branch_english_name: string;
  sar_name: string;
  work_place_code: number;
  work_place_name: string;
  work_place_level: string;
  base_branch_code: string;
  branch_address: string;
  english_branch_address: string;
  branch_phone: string;
  branch_fax: string;
  branch_email: string;
  branch_postal_Code: string;
}

interface UserPersonalInfo {
  address: string;
  phone_number: string;
  phone_verified: boolean;
  email: string;
  email_verified: boolean;
  birthdate: number;
  picture: string;
  profile: string;
  username: string;
  update_at: number;
  gender: string;
}

interface UserInfo {
  name: string;
  english_name: string;
  family: string;
  english_family: string;
  organization: string;
  national_code: string;
  employee_id: string;
  branch_code: string;
  job_code: string;
  job_status_code: string;
}

export interface DownloadRequestParams {
  ssn?: string;
  id?: string;
  inputFileName?: string;
}

export interface DownloadReceiptParams {
  requestId?: string;
  detailsId?: string;
  requestType?: string;
}

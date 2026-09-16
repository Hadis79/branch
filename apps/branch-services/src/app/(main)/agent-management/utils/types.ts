import { ReactNode } from 'react';

export type InfoItemType = {
  type: string;
  title: string;
  value?: string | ReactNode;
  line?: boolean;
  subValue?: string;
  displayValue?: boolean;
};

export interface SsnInfo {
  EngFirstName?: string;
  EngLastName?: string;
  FirstName?: string;
  LastName?: string;
  Photo?: unknown;
  SSN?: string;
}

export interface AgentResponseDto {
  orgSsn: string;
  orgName: string;
  userSsn: string;
  userName: string;
  branchAgentSsn: string;
  branchAgentName: string;
  branchCode: string;
  branchName: string;
}

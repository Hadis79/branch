import { ReactNode } from 'react';

export type InfoItemType = {
  type: string;
  title: string;
  value?: string | ReactNode;
  line?: boolean;
  subValue?: string;
  displayValue?: boolean;
};

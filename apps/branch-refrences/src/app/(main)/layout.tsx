'use client';

import { DashboardLayoutRefrences } from '@branch-services/layouts';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutRefrences>{children}</DashboardLayoutRefrences>;
}

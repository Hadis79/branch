'use client';

import { DashboardLayout } from '@branch-services/layouts';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

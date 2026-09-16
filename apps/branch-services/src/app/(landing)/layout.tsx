'use client';

import { LandingLayout } from '@branch-services/layouts';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <LandingLayout>{children}</LandingLayout>;
}

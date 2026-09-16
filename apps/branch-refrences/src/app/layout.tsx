'use client';

import { ClientOnly } from '@branch-services/layouts';
import { BaseProvider } from '../provider/base-provider';
import { StyledComponentsRegistry } from './registry';
import 'remixicon/fonts/remixicon.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <ClientOnly>
          <StyledComponentsRegistry>
            <BaseProvider>{children}</BaseProvider>
          </StyledComponentsRegistry>
        </ClientOnly>
      </body>
    </html>
  );
}

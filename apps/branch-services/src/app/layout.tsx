'use client';

import { BaseProvider } from '../provider/base-provider';
import { StyledComponentsRegistry } from './registry';
import 'remixicon/fonts/remixicon.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <StyledComponentsRegistry>
          <BaseProvider>{children}</BaseProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

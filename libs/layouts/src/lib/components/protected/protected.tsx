import { ReactNode } from 'react';

import ClientOnly from '../client-only/client-only';
import { RouteGuard } from '../route-guard/route-guard';

export type ProtectedProps = {
  children: ReactNode;
};

const Protected = ({ children }: ProtectedProps) => {
  return (
    <ClientOnly>
      {/*<RouteGuard>{children}</RouteGuard>*/}
      {children}
    </ClientOnly>
  );
};

export default Protected;

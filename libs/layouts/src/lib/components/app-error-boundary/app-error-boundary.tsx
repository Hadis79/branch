import React from 'react';
import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from './error-fallback';

const AppErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
  const errorHandler = (error: Error, componentStack: { componentStack: string }) => {
    console.debug('caught error in AppErrorBoundary');
    console.error(error, componentStack);
  };

  return <ErrorBoundary FallbackComponent={ErrorFallback} /*onError={errorHandler}*/>{children}</ErrorBoundary>;
};

export default AppErrorBoundary;

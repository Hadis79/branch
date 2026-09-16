import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type ReactQueryProviderProps = {
  children: ReactNode;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 20, // Queries will be considered fresh for 20 minutes
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

export const useReactQueryClient = () => {
  const ProviderQueryClient = ({ children }: ReactQueryProviderProps) => (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );

  return { ProviderQueryClient };
};

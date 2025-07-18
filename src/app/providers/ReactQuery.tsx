import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

interface ReactQueryProps {
  children: React.ReactNode;
}

export function ReactQuery({ children }: Readonly<ReactQueryProps>) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

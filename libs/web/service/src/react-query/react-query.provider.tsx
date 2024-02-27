'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, ReactElement, FC } from 'react';

export const ReactQueryProvider: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const query = new QueryClient();
  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
};

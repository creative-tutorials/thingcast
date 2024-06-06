"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function TanStackClient({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // disable refetching on window focus
        retry: 2, // retry on network errors
      },
    },
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

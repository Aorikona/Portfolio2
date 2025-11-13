"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { PointerProvider } from "@/context/pointer-context";

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 10,
            gcTime: 1000 * 60 * 30,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      <PointerProvider>{children}</PointerProvider>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false}  />
      )}
    </QueryClientProvider>
  );
};


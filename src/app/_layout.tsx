import { useState } from "react";
import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
import { AuthProvider } from "@/src/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RootNavigator from "@/src/components/RootNavigator";
import "@/global.css";

export default function RootLayout() {
  // Se usa useState para instanciarlo una sola vez y no recrearlo en re-renders
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutos en caché
            retry: 2,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}

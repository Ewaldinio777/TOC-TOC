import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
import { AuthProvider } from "@/src/context/AuthContext";

import RootNavigator from "@/src/components/RootNavigator";
import "@/global.css";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </GluestackUIProvider>
  );
}

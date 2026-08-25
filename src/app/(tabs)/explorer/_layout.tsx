//example

import { Stack } from "expo-router";

export default function ServicesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="explorer-screen"
        options={{
          title: "Explorar",
        }}
      />
    </Stack>
  );
}

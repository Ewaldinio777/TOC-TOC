//example

import { Stack } from "expo-router";

export default function ServicesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="orders-screen"
        options={{
          title: "Ordenes",
        }}
      />
    </Stack>
  );
}

//example

import { Stack } from "expo-router";

export default function ServicesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Providers",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="details"
        options={{
          title: "Service Details",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="booking"
        options={{
          title: "Booking",
          headerShown: false,
        }}
      />
    </Stack>
  );
}

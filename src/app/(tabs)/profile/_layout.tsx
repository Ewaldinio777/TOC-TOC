//example

import { Stack } from "expo-router";

export default function ServicesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="profile-screen"
        options={{
          title: "Perfiles",
        }}
      />
    </Stack>
  );
}

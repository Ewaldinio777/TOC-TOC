import { Icon, NativeTabs, VectorIcon } from "expo-router/unstable-native-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabsNative() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger
        name="services"
        options={{
          title: "Servicios",
        }}
      >
        <Icon
          sf="magnifyingglass"
          androidSrc={<VectorIcon family={Ionicons} name="search-outline" />}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="chats"
        options={{
          title: "Chats",
        }}
      >
        <Icon
          sf="bubble.left.and.bubble.right"
          androidSrc={
            <VectorIcon family={Ionicons} name="chatbubbles-outline" />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="explorer"
        options={{
          title: "Explorar",
        }}
      >
        <Icon
          sf="house"
          androidSrc={
            <VectorIcon family={Ionicons} name="storefront-outline" />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="orders"
        options={{
          title: "Ordenes",
        }}
      >
        <Icon
          sf="calendar"
          androidSrc={<VectorIcon family={Ionicons} name="calendar-outline" />}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="profile"
        options={{
          title: "Perfil",
        }}
      >
        <Icon
          sf="person.crop.circle"
          androidSrc={
            <VectorIcon family={Ionicons} name="person-circle-outline" />
          }
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

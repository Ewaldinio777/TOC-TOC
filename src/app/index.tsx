import { Redirect } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";

export default function Index() {
  const { isLoggedIn } = useAuth();

  return <Redirect href={isLoggedIn ? "/(tabs)" : "/login"} />;
}

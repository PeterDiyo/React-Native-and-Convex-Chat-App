import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayoutNav() {
  const router = useRouter();

  return (
    <ConvexProvider client={convex}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#4169e1" }, // royal blue
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold", fontSize: 20, color: "#fff" },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            header: () => (
              <View
                style={{
                  backgroundColor: "#4169e1",
                  paddingTop: 40,
                  paddingBottom: 10,
                  paddingHorizontal: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 24 }}
                >
                  Group Chats
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(modal)/create")}
                >
                  <Ionicons name="add-outline" size={28} color="white" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="(modal)/create"
          options={{
            header: () => (
              <View
                style={{
                  backgroundColor: "#4169e1",
                  paddingTop: 40,
                  paddingBottom: 10,
                  paddingHorizontal: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="close-outline" size={28} color="white" />
                </TouchableOpacity>
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 24 }}
                >
                  Start a New Group
                </Text>
              </View>
            ),
            presentation: "modal",
            headerShown: true,
            animation: "slide_from_bottom",
            gestureEnabled: true,
            gestureDirection: "vertical",
          }}
        />
        <Stack.Screen
          name="(chat)/[chatid]"
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: "#4169e1" }, // royal blue
            headerTintColor: "#fff",
          }}
        />
      </Stack>
    </ConvexProvider>
  );
}

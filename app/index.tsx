import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dialog from "../components/Dialog";

const Page = () => {
  const groups = useQuery(api.groups.get) || [];
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (!user) {
        setTimeout(() => {
          setVisible(true);
        }, 100);
      } else {
        setName(user);
      }
    };
    loadUser();
  }, []);

  const setUser = async () => {
    let r = (Math.random() + 1).toString(36).substring(7);
    const userName = `${name}#${r}`;
    await AsyncStorage.setItem("user", userName);
    setName(userName);
    setVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {groups.map((group) => (
          <Link
            href={{
              pathname: "/(chat)/[chatid]",
              params: { chatid: group._id },
            }}
            key={group._id.toString()}
            asChild
          >
            <TouchableOpacity style={styles.group}>
              <Image
                source={{ uri: group.icon_url }}
                style={{ width: 50, height: 50 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 500, fontSize: 15 }}>
                  {group.name}
                </Text>
                <Text style={{ color: "#666" }}>
                  {group.description || "No description"}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
      <Dialog.container visible={visible}>
        <Dialog.title>user name required</Dialog.title>
        <Dialog.description>
          Please enter your name to continue
        </Dialog.description>
        <Dialog.input
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        <Dialog.button onPress={setUser} />
        <Dialog.close onPress={() => setVisible(false)} />
      </Dialog.container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  group: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});

export default Page;

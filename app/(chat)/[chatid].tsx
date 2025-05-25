import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  ListRenderItem,
  FlatList,
  Keyboard,
} from "react-native";
import React, { use, useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const { chatid } = useLocalSearchParams();
  const [user, setUser] = useState<string | null>(null);
  const convex = useConvex();
  const navigation = useNavigation();
  const [newMessage, setNewMessage] = useState("");

  // Send and load messages for the chat
  const addMessage = useMutation(api.messages.sendMessage);
  const messages =
    useQuery(api.messages.get, { chatId: chatid as Id<"groups"> }) || [];

  const listRef = useRef<FlatList>(null);

  // Load group information from Convex
  useEffect(() => {
    const loadGroup = async () => {
      const groupInfo = await convex.query(api.groups.getGroup, {
        id: chatid as Id<"groups">,
      });
      navigation.setOptions({
        headerTitle: groupInfo?.name,
      });
    };
    loadGroup();
  }, [chatid]);

  // Load user from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem("user");
      setUser(user);
    };
    loadUser();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 300);
  }, [messages]);

  const handleSendMessage = () => {
    Keyboard.dismiss();
    addMessage({
      group_id: chatid as Id<"groups">,
      content: newMessage,
      user: user || "Anonymous",
    });
    setNewMessage("");
  };

  const renderMessage: ListRenderItem<Doc<"messages">> = ({ item }) => {
    const isUserMessage = item.user === user;

    return (
      <View
        style={[
          styles.messageContainer,
          isUserMessage
            ? styles.userMessageContainer
            : styles.otherMessageContainer,
          styles.messageShadow,
        ]}
      >
        <Text
          style={[styles.messageText, isUserMessage && styles.userMessageText]}
        >
          {item.content}
        </Text>
        <Text style={styles.timestamp}>
          {new Date(item._creationTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          - {item.user}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={[styles.container, { flex: 1 }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        {/* TODO: Drag ons */}
        <View style={{ flex: 1 }}>
          {/* Messages list */}
          <FlatList
            ref={listRef}
            ListFooterComponent={<View style={{ padding: 10 }} />}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>

        {/* Bottom input */}
        <View style={styles.input}>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
              multiline={true}
              numberOfLines={4}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
              disabled={newMessage === ""}
            >
              <Ionicons name="send-outline" size={24} color="#fff"></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 0.5,
    borderColor: "#ccc",
  },
  textInput: {
    flex: 1,
    height: 45,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f7f7f7",
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#4169e1", // royal blue
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    padding: 12,
    borderRadius: 16,
    marginTop: 10,
    marginHorizontal: 10,
    maxWidth: "80%",
  },
  userMessageContainer: {
    backgroundColor: "#4169e1",
    alignSelf: "flex-end",
    borderTopRightRadius: 4,
  },
  otherMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: 4,
  },
  messageShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 16,
    flexWrap: "wrap",
    color: "#222",
  },
  userMessageText: {
    color: "#fff",
  },
  timestamp: {
    fontSize: 12,
    color: "#c7c7c7",
  },
});

export default Page;

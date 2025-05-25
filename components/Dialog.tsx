import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

// Container component
const DialogContainer: React.FC<{
  visible: boolean;
  children: React.ReactNode;
}> = ({ visible, children }) => (
  <Modal visible={visible} transparent animationType="slide">
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.content}>{children}</View>
    </KeyboardAvoidingView>
  </Modal>
);

// Title component
const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={styles.title}>{children}</Text>
);

// Description component
const DialogDescription: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Text style={styles.message}>{children}</Text>;

// Input component
const DialogInput: React.FC<{
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}> = ({ value, onChangeText, placeholder }) => (
  <TextInput
    style={styles.input}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
  />
);

// Button component
const DialogButton: React.FC<{
  onPress: () => void;
  children?: React.ReactNode;
}> = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{children || "Continue"}</Text>
  </TouchableOpacity>
);

// Close button component
const DialogClose: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: "#aaa", marginTop: 8 }]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>Close</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4169e1",
    padding: 12,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const Dialog = {
  container: DialogContainer,
  title: DialogTitle,
  description: DialogDescription,
  input: DialogInput,
  button: DialogButton,
  close: DialogClose,
};

export default Dialog;

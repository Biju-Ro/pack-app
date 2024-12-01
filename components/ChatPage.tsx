import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

// Sample chat data (would normally come from backend/state management)
const INITIAL_MESSAGES = [
  {
    id: "1",
    text: "Hey, what's up?",
    sender: "other",
    timestamp: "2:30 PM",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    text: "Not much, just working on a project",
    sender: "me",
    timestamp: "2:31 PM",
    avatar: "https://via.placeholder.com/50",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState("");
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      id: String(messages.length + 1),
      text: inputMessage,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar: "https://via.placeholder.com/50",
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Simulate a response after a short delay
    setTimeout(() => {
      const responseMessage = {
        id: String(messages.length + 2),
        text: `You said: ${inputMessage}`,
        sender: "other",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: "https://via.placeholder.com/50",
      };
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    }, 1000);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderMessage = ({ item }) => {
    const isMe = item.sender === "me";
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.myMessageContainer : styles.otherMessageContainer,
        ]}
      >
        {!isMe && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
        <View
          style={[
            styles.messageBubble,
            isMe ? styles.myMessageBubble : styles.otherMessageBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isMe ? styles.myMessageText : styles.otherMessageText,
            ]}
          >
            {item.text}
          </Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={styles.headerAvatar}
          />
          <Text style={styles.headerTitle}>John Doe</Text>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <FontAwesome5 name="video" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
        style={styles.inputContainer}
      >
        <TouchableOpacity style={styles.attachButton}>
          <FontAwesome5 name="plus" size={20} color="#666" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <FontAwesome5
            name="paper-plane"
            size={20}
            color={inputMessage ? "#dc3545" : "#999"}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  // Header Styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    padding: 10,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  callButton: {
    padding: 10,
  },
  // Messages List Styles
  messagesList: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-end",
  },
  myMessageContainer: {
    justifyContent: "flex-end",
  },
  otherMessageContainer: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 15,
  },
  myMessageBubble: {
    backgroundColor: "#dc3545",
    borderBottomRightRadius: 0,
  },
  otherMessageBubble: {
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
  },
  myMessageText: {
    color: "#ffffff",
  },
  otherMessageText: {
    color: "#333",
  },
  timestamp: {
    fontSize: 10,
    color: "#666",
    marginTop: 5,
    alignSelf: "flex-end",
  },
  // Input Container Styles
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  attachButton: {
    marginRight: 10,
    padding: 10,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    padding: 10,
  },
});

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
  Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

// Sample Group Chat Data with More User Details
const INITIAL_MESSAGES = [
  {
    id: "1",
    text: "Hey everyone, how's the floor doing?",
    sender: {
      id: "1",
      name: "John Smith",
      avatar: "https://via.placeholder.com/50",
      major: "Computer Science",
      interests: ["Coding", "Gaming", "AI"],
    },
    timestamp: "2:30 PM",
  },
  {
    id: "2",
    text: "Pretty good! Working on our group project",
    sender: {
      id: "2",
      name: "Emma Rodriguez",
      avatar: "https://via.placeholder.com/50",
      major: "Data Science",
      interests: ["Machine Learning", "Photography", "Hiking"],
    },
    timestamp: "2:31 PM",
  },
];
interface User {
  id: string;
  name: string;
  avatar: string;
  major: string;
  interests: string[];
}

export default function FloorChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      id: String(messages.length + 1),
      text: inputMessage,
      sender: {
        id: "me",
        name: "You",
        avatar: "https://via.placeholder.com/50",
        major: "Computer Engineering",
        interests: ["Web Dev", "Music", "Sports"],
      },
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages, flatListRef]);

  const UserProfileModal = () => {
    if (!selectedUser) return null;

    return (
      <Modal
        transparent={true}
        visible={!!selectedUser}
        onRequestClose={() => setSelectedUser(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image
              source={{ uri: selectedUser.avatar }}
              style={styles.modalAvatar}
            />
            <Text style={styles.modalName}>{selectedUser.name}</Text>
            <Text style={styles.modalMajor}>{selectedUser.major}</Text>
            <View style={styles.interestsContainer}>
              {selectedUser.interests.map(
                (
                  interest:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined,
                  index: React.Key | null | undefined
                ) => (
                  <View key={index} style={styles.interestPill}>
                    <Text style={styles.interestPillText}>{interest}</Text>
                  </View>
                )
              )}
            </View>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setSelectedUser(null)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderMessage = ({ item }) => {
    const isMe = item.sender.id === "me";
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.myMessageContainer : styles.otherMessageContainer,
        ]}
      >
        <Stack.Screen options={{ headerShown: false }} />
        {!isMe && (
          <TouchableOpacity onPress={() => setSelectedUser(item.sender)}>
            <Image source={{ uri: item.sender.avatar }} style={styles.avatar} />
          </TouchableOpacity>
        )}
        <View
          style={[
            styles.messageBubble,
            isMe ? styles.myMessageBubble : styles.otherMessageBubble,
          ]}
        >
          {!isMe && <Text style={styles.senderName}>{item.sender.name}</Text>}
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/(tabs)")}
        >
          <FontAwesome5 name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Floor Chats</Text>
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

      {/* User Profile Modal */}
      <UserProfileModal />

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 80,
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
    marginRight: 15,
  },
  headerTitle: {
    paddingLeft: 115,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
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
  senderName: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
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
    backgroundColor: "red",
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
    color: "#D3D3D3",
    marginTop: 5,
    alignSelf: "flex-end",
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    height: 100,
  },
  input: {
    flex: 1,
    maxHeight: 500,
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  modalName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalMajor: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 15,
  },
  interestPill: {
    backgroundColor: "#dc3545",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  interestPillText: {
    color: "white",
    fontSize: 12,
  },
  closeModalButton: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  closeModalButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
});

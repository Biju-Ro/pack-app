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
  Animated,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useApplicationContext from "@/hooks/useApplicationContext";
import { RACHATDATA, ROTATINGCHATDATA } from "@/data/application";
import { FloorChat, RAChat, RotatingChat, User, Event, Message } from "@/types";
import { router, Stack, useNavigation } from "expo-router";

// Sample group chat data
// const INITIAL_MESSAGES = [
//   {
//     id: "1",
//     text: "Who's excited for tonight's game?",
//     sender: "Mike",
//     avatar: "https://via.placeholder.com/50",
//     timestamp: "2:30 PM",
//   },
//   {
//     id: "2",
//     text: "Lakers are looking strong this season!",
//     sender: "Sarah",
//     avatar: "https://via.placeholder.com/50",
//     timestamp: "2:31 PM",
//   },
// ];

// const GROUP_MEMBERS = [
//   { name: "Mike", avatar: "https://via.placeholder.com/50" },
//   { name: "Sarah", avatar: "https://via.placeholder.com/50" },
//   { name: "John", avatar: "https://via.placeholder.com/50" },
// ];

export default function GroupChatPage() {
  const navigation = useNavigation();
  const { users, rotatingChat, setRotatingChat } = useApplicationContext();
  //const [messages, setMessages] = useState<Message[]>(rotatingChat.messages);
  const [inputMessage, setInputMessage] = useState<string>("");
  const flatListRef = useRef(null);
  const timerAnimation = useRef(new Animated.Value(1)).current;
  //const [timeRemaining, setTimeRemaining] = useState<number>(rotatingChat.secondsRemaining); // 2 weeks in seconds

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setRotatingChat({
        ...rotatingChat,
        secondsRemaining: rotatingChat.secondsRemaining - 1,
      });
      if (rotatingChat.secondsRemaining <= 0) {
        clearInterval(timer);
        setRotatingChat({ ...rotatingChat, secondsRemaining: 0 });
      }
      // setTimeRemaining((prev) => {
      //   if (prev <= 0) {
      //     clearInterval(timer);
      //     return 0;
      //   }
      //   return prev - 1;
      // });

      // Animate timer
      Animated.timing(timerAnimation, {
        toValue: rotatingChat.secondsRemaining / 1209600, // Normalize to 0-1
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, 1000);

    return () => clearInterval(timer);
  }, [rotatingChat]);

  // Convert seconds to days, hours, minutes
  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const senders = rotatingChat.members.map((member) => member);
    var randomSender = users[0].uid;
    while (randomSender === users[0].uid) {
      randomSender = senders[Math.floor(Math.random() * senders.length)];
    }

    const newMessage = {
      mid: rotatingChat.messages.length + 1,
      text: inputMessage,
      senderUid: users[0].uid,
      avatar: users[0].picture,
      timestamp: new Date(),
      // .toLocaleTimeString([], {
      //   hour: "2-digit",
      //   minute: "2-digit",
      // }),
    };

    //setMessages([...messages, newMessage]);
    setRotatingChat({
      ...rotatingChat,
      messages: [...rotatingChat.messages, newMessage],
    });
    setInputMessage("");

    // Simulate group chat response
    // NOTE: Ok so apparently this is being called every second. Is there a way that this only gets called once lol.
    setTimeout(() => {
      const responseMessage = {
        mid: rotatingChat.messages.length + 2,
        text: `${users[randomSender].nickname} liked that comment!`,
        senderUid: -1,
        timestamp: new Date(),
        // .toLocaleTimeString([], {
        //   hour: "2-digit",
        //   minute: "2-digit",
        // }),
        avatar: users[randomSender].picture,
      };
      setRotatingChat({
        ...rotatingChat,
        messages: [...rotatingChat.messages, newMessage, responseMessage],
      });

      //setMessages((prevMessages) => [...prevMessages, responseMessage]);
    }, 1000);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    // NOTE: commented this out becuase the rerendering bug causes this to get called over and over again.
    // Or wait. Actually... This may be because the seconds are now linked to rotating chat as a whole.
    //flatListRef.current?.scrollToEnd({ animated: true });
  }, [rotatingChat]);

  const renderMessage = ({ item }: any) => {
    const isMe = item.senderUid === 0;
    const isSystem = item.senderUid === -1;

    return (
      <View
        style={[
          styles.messageContainer,
          isMe
            ? styles.myMessageContainer
            : isSystem
            ? styles.systemMessageContainer
            : styles.otherMessageContainer,
        ]}
      >
        {!isMe && !isSystem && (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        )}
        <View
          style={[
            styles.messageBubble,
            isMe
              ? styles.myMessageBubble
              : isSystem
              ? styles.systemMessageBubble
              : styles.otherMessageBubble,
          ]}
        >
          {!isMe && !isSystem && (
            <Text style={styles.senderName}>{item.sender}</Text>
          )}
          <Text
            style={[
              styles.messageText,
              isMe
                ? styles.myMessageText
                : isSystem
                ? styles.systemMessageText
                : styles.otherMessageText,
            ]}
          >
            {item.text}
          </Text>
          <Text style={styles.timestamp}>
            {item.timestamp.toLocaleTimeString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Timer and Topic */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/(tabs)")}
        >
          <FontAwesome5 name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <Animated.View
            style={[
              styles.timerBar,
              {
                width: timerAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
          <Text style={styles.timerText}>
            {formatTime(rotatingChat.secondsRemaining)}
          </Text>
        </View>

        {/* Topic Pill */}
        <View style={styles.topicPill}>
          <FontAwesome5 name="basketball-ball" size={16} color="white" />
          <Text style={styles.topicText}>Basketball</Text>
        </View>
      </View>

      {/* Group Members Preview */}
      <TouchableOpacity
        style={styles.memberPreview}
        onPress={() => router.push("/members")} // Navigate to the 'Members' screen
      >
        {rotatingChat.members.map((member, index) => (
          <Image
            key={index}
            source={{ uri: users[member].picture }}
            style={styles.memberAvatar}
          />
        ))}
        <Text style={styles.memberCount}>
          +{rotatingChat.members.length} Members
        </Text>
      </TouchableOpacity>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={rotatingChat.messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.mid.toString()}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />

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
      <Stack.Screen options={{ headerShown: false }} />
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
    paddingTop: 65,
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
  // Timer Styles
  timerContainer: {
    flex: 1,
    height: 30,
    backgroundColor: "red",
    borderRadius: 15,
    marginHorizontal: 10,
    justifyContent: "center",
    overflow: "hidden",
  },
  timerBar: {
    position: "absolute",
    height: "100%",
    backgroundColor: "red",
    borderRadius: 15,
  },
  timerText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    zIndex: 1,
  },
  // Topic Pill Styles
  topicPill: {
    flexDirection: "row",
    backgroundColor: "red",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  topicText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "bold",
  },
  // Group Members Preview
  memberPreview: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },
  memberAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: -10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  memberCount: {
    marginLeft: 20,
    color: "#666",
  },
  // Existing styles remain the same as previous implementation
  // ... (rest of the styles from previous implementation)

  // Additional message container styles for system messages
  systemMessageContainer: {
    alignItems: "center",
  },
  systemMessageBubble: {
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
  },
  systemMessageText: {
    color: "#666",
    fontStyle: "italic",
  },
  senderName: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
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
  // Input Container Styles
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
});

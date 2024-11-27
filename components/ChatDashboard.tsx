import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const ChatDashboard = () => {
  // Mock data for notification counts
  const notifications = {
    floorChats: 3,
    raChat: 5,
    rotatingChat: 2,
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatButtonsContainer}>
        {/* Floor Chats */}
        <TouchableOpacity style={styles.chatButton}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{notifications.floorChats}</Text>
          </View>
          <Text style={styles.buttonText}>Floor Chats</Text>
        </TouchableOpacity>

        {/* RA Chat */}
        <TouchableOpacity style={styles.chatButton}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{notifications.raChat}</Text>
          </View>
          <Text style={styles.buttonText}>RA Chat</Text>
        </TouchableOpacity>

        {/* Rotating Chat */}
        <TouchableOpacity style={styles.chatButton}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{notifications.rotatingChat}</Text>
          </View>
          <Text style={styles.buttonText}>Rotating Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  chatButtonsContainer: {
    width: "100%",
    alignItems: "center",
  },
  chatButton: {
    width: 300, // Full width within container
    maxWidth: 300, // Maximum width
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 15,
    paddingVertical: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    shadowColor: "#000", // Adding shadow
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, // For Android shadow
    backgroundColor: "#f9f9f9",
  },
  buttonText: {
    fontSize: 18,
    color: "#222",
    fontWeight: "600",
  },
  badgeContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "red",
    borderRadius: 10,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ChatDashboard;

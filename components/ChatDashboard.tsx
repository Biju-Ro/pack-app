import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link, router } from "expo-router";

const ChatDashboard = () => {
  const notifications = {
    floorChats: true, // Show "New Messages"
    raChat: true, // Show "New Messages"
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const fadeAnim = new Animated.Value(1); // Animation value for countdown fade

  // Calculate time left for rotating chat (biweekly)
  function calculateTimeLeft() {
    const now = new Date();
    const nextRotation = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + (14 - (now.getDate() % 14)),
      0, // Midnight for exact biweekly reset
      0,
      0
    );
    const difference = nextRotation.getTime() - now.getTime();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  // Update countdown every second with animation
  useEffect(() => {
    const timer = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.5, // Fade out slightly
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1, // Fade back in
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [fadeAnim]);

  // Render countdown text for the badge
  const renderCountdown = () => {
    const { days, hours, minutes, seconds } = timeLeft;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatButtonsContainer}>
        {/* Floor Chats Button */}
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => router.push("/floorchat")}
        >
          <Feather
            name="users"
            size={24}
            color="#333"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Floor Chat</Text>
          <View style={[styles.badgeContainer, styles.wideBadge]}>
            <Text style={styles.badgeText}>New Messages</Text>
          </View>
        </TouchableOpacity>

        {/* RA Chat Button */}
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => router.push("/chatpage")}
        >
          <Feather
            name="message-circle"
            size={24}
            color="#333"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>RA Chat</Text>
          <View style={[styles.badgeContainer, styles.wideBadge]}>
            <Text style={styles.badgeText}>New Messages</Text>
          </View>
        </TouchableOpacity>

        {/* Rotating Chat Button */}

        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => router.push("/rotatingchat")}
        >
          <Feather
            name="refresh-cw"
            size={24}
            color="#333"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Rotating Chat</Text>
          <View style={[styles.badgeContainer, styles.wideBadge]}>
            <Animated.Text style={[styles.badgeText, { opacity: fadeAnim }]}>
              {renderCountdown()}
            </Animated.Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  chatButtonsContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 15,
  },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    borderRadius: 50, // Rounded edges
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    position: "relative",
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
  },
  buttonIcon: {
    marginRight: 15,
  },
  badgeContainer: {
    position: "absolute",
    top: -9,
    right: -2,
    backgroundColor: "red",
    borderRadius: 15,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  wideBadge: {
    width: 100, // Wider for text
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ChatDashboard;

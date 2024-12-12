import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { router, Stack, useNavigation } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons"; // Import FontAwesome5

// Define a type for each user
interface User {
  id: string;
  name: string;
  avatar: string;
  major: string;
  interests: string[];
}

const USERS: User[] = [
  {
    id: "1",
    name: "John Smith",
    avatar: "https://via.placeholder.com/100",
    major: "Sports Management",
    interests: ["Basketball", "Marketing", "Coaching"],
  },
  {
    id: "2",
    name: "Emma Rodriguez",
    avatar: "https://via.placeholder.com/100",
    major: "Sports Journalism",
    interests: ["Writing", "Photography", "Broadcasting"],
  },
  {
    id: "3",
    name: "Liam Chen",
    avatar: "https://via.placeholder.com/100",
    major: "Athletic Training",
    interests: ["Physiology", "Health", "Rehabilitation"],
  },
  {
    id: "4",
    name: "Sophia Patel",
    avatar: "https://via.placeholder.com/100",
    major: "Event Management",
    interests: ["Event Planning", "Sports Logistics", "Sponsorships"],
  },
];

export default function ContactListPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Specify the type for selectedUser
  const navigation = useNavigation(); // Initialize navigation

  const renderUser = (
    { item }: { item: User } // Explicitly define the type of item
  ) => (
    <TouchableOpacity
      style={styles.userContainer}
      onPress={() => setSelectedUser(item)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userMajor}>{item.major}</Text>
      </View>
    </TouchableOpacity>
  );

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
              {selectedUser.interests.map((interest, index) => (
                <View key={index} style={styles.interestPill}>
                  <Text style={styles.interestPillText}>{interest}</Text>
                </View>
              ))}
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/rotatingchat")}
        >
          <FontAwesome5 name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{USERS.length} Members</Text>
      </View>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Contact list */}
      <FlatList
        data={USERS}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <UserProfileModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40, // Adjust header position
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    paddingLeft: 12,
  },
  listContainer: {
    paddingVertical: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  userMajor: {
    fontSize: 14,
    color: "#666",
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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  modalName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
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

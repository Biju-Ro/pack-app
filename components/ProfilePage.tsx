import React from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from "react-native";

// Import user data from JSON
import userData from "../data/user.json";

export default function ProfilePage({ navigation }: { navigation: any }) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri:
              userData.ProfilePicture ||
              "/Users/rohanbiju15/Documents/GitHub/pack-app/assets/default.jpg",
          }}
          style={styles.image}
        />
      </View>

      {/* Profile Card */}
      <View style={styles.card}>
        {/* Name */}
        <Text style={styles.name}>
          {userData.first_name} {userData.last_name}
        </Text>

        {/* Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.details}>Major: {userData.major}</Text>
          <Text style={styles.details}>Minor: {userData.minor}</Text>
          <Text style={styles.details}>Dorm: {userData.dorm}</Text>
        </View>

        {/* Tags */}
        <View style={styles.tagContainer}>
          {userData.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Edit Profile Button */}
      </View>

      <Pressable style={styles.editButton}>
        <Link href="/profileedit">
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Link>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 20,
  },
  imageWrapper: {
    position: "absolute",
    top: 30,
    alignItems: "center",
    width: "100%",
    zIndex: 10,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
    shadowColor: "#888",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
    width: "85%",
    marginTop: 100,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    letterSpacing: 0.5,
  },
  detailsContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  details: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  tag: {
    backgroundColor: "#dc3545",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 5,
    shadowColor: "#dc3545",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  tagText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  editButton: {
    backgroundColor: "#dc3545",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 35,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  homeLink: {
    marginTop: 20,
  },
  homeLinkText: {
    color: "#dc3545",
    fontSize: 16,
    fontWeight: "600",
  },
});

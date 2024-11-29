import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function ProfilePage({ navigation }: { navigation: any }) {
  const mockData = {
    photo: "https://via.placeholder.com/150",
    name: "John Doe",
    major: "Computer Science",
    minor: "Mathematics",
    tags: ["React", "Expo", "Developer"],
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: mockData.photo }} style={styles.image} />
      </View>
      <View style={styles.card}>
        <Text style={styles.name}>{mockData.name}</Text>
        <Text style={styles.details}>Major: {mockData.major}</Text>
        <Text style={styles.details}>Minor: {mockData.minor}</Text>
        <View style={styles.tagContainer}>
          {mockData.tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50, // Add space at the top for the image
  },
  imageWrapper: {
    position: "absolute",
    top: -80, // Adjust the image to go beyond the screen
    left: 0,
    right: 0,
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    width: "70%",
    marginTop: 100, // Adjust card position so it doesn't overlap with the image
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
  },
  details: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tag: {
    backgroundColor: "red",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: "red",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

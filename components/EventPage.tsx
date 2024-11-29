import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const DATA = [
  { id: "1", tagname: "Basketball" },
  { id: "2", tagname: "Reels" },
  { id: "3", tagname: "Climbing" },
  { id: "4", tagname: "Dinner" },
  { id: "5", tagname: "Free Food" },
];

const Tag = ({ tagname }) => (
  <View style={styles.tag}>
    <Text style={styles.tagText}>{tagname}</Text>
  </View>
);

export default function EventPage() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [yesCount, setYesCount] = useState(0);
  const [maybeCount, setMaybeCount] = useState(0);
  const [noCount, setNoCount] = useState(0);

  const handlePress = (type) => {
    if (selectedButton === type) {
      setSelectedButton(null);
      if (type === "yes") setYesCount((prev) => prev - 1);
      if (type === "maybe") setMaybeCount((prev) => prev - 1);
      if (type === "no") setNoCount((prev) => prev - 1);
    } else {
      if (selectedButton === "yes") setYesCount((prev) => prev - 1);
      if (selectedButton === "maybe") setMaybeCount((prev) => prev - 1);
      if (selectedButton === "no") setNoCount((prev) => prev - 1);

      setSelectedButton(type);
      if (type === "yes") setYesCount((prev) => prev + 1);
      if (type === "maybe") setMaybeCount((prev) => prev + 1);
      if (type === "no") setNoCount((prev) => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.eventBox}>
        <Text style={styles.eventTitle}>Food Court</Text>
        <Text style={styles.eventDetails}>
          <Text style={styles.bold}>Host:</Text> RA Alex
        </Text>
        <Text style={styles.eventDetails}>
          <Text style={styles.bold}>Date:</Text> 12/3/24
        </Text>
        <Text style={styles.eventDetails}>
          <Text style={styles.bold}>Time:</Text> 6:00 PM EST
        </Text>
        <Text style={[styles.eventDetails, styles.bold]}>Tags:</Text>
        <View style={styles.tagBox}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Tag tagname={item.tagname} />}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
        <Text style={styles.attendingPrompt}>Will you be attending?</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.responseButton,
              selectedButton === "yes"
                ? styles.yesButton
                : styles.yesbuttonOutline,
              selectedButton === "yes" && { backgroundColor: "green" },
            ]}
            onPress={() => handlePress("yes")}
          >
            <FontAwesome
              name="check"
              size={20}
              color={selectedButton === "yes" ? "white" : "green"}
            />
            <Text
              style={[
                styles.buttonText,
                selectedButton === "yes"
                  ? { color: "white" }
                  : { color: "green" },
              ]}
            >
              {yesCount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.responseButton,
              selectedButton === "maybe"
                ? styles.maybeButton
                : styles.maybebuttonOutline,
              selectedButton === "maybe" && { backgroundColor: "#f1c40f" },
            ]}
            onPress={() => handlePress("maybe")}
          >
            <FontAwesome
              name="question"
              size={20}
              color={selectedButton === "maybe" ? "white" : "#f1c40f"}
            />
            <Text
              style={[
                styles.buttonText,
                selectedButton === "maybe"
                  ? { color: "white" }
                  : { color: "#f1c40f" },
              ]}
            >
              {maybeCount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.responseButton,
              selectedButton === "no"
                ? styles.noButton
                : styles.nobuttonOutline,
              selectedButton === "no" && { backgroundColor: "red" },
            ]}
            onPress={() => handlePress("no")}
          >
            <FontAwesome
              name="close"
              size={20}
              color={selectedButton === "no" ? "white" : "red"}
            />
            <Text
              style={[
                styles.buttonText,
                selectedButton === "no" ? { color: "white" } : { color: "red" },
              ]}
            >
              {noCount}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  eventBox: {
    width: "90%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  eventTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventDetails: {
    fontSize: 18,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  tagBox: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#ff0000",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  tagText: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "bold",
  },
  attendingPrompt: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
  responseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
    width: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 8,
  },
  yesbuttonOutline: {
    borderWidth: 2,
    backgroundColor: "transparent",
    borderColor: "green",
  },
  maybebuttonOutline: {
    borderWidth: 2,
    backgroundColor: "transparent",
    borderColor: "#f1c40f",
  },
  nobuttonOutline: {
    borderWidth: 2,
    backgroundColor: "transparent",
    borderColor: "red",
  },
});

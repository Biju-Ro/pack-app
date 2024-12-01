import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EventPage from "@/components/EventPage";
import { Link } from "expo-router";

const Page = () => {
  return <EventPage />;
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

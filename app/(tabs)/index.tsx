import { StyleSheet, View, Text } from "react-native";
import React from "react";
import ChatDashboard from "@/components/ChatDashboard";

const Page = () => {
  return <ChatDashboard />;
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { StyleSheet, View, Text } from "react-native";
import React from "react";

import MyEventsPage from "@/components/MyEvents";

const Page = () => {
  return <MyEventsPage />;
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

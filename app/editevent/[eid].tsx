import { StyleSheet, View, Text } from "react-native";
import React from "react";
import ProfilePage from "@/components/ProfilePage";
import ProfileEdit from "@/components/ProfileEdit";
import EditEventPage from "@/components/EditEventsPage";

const Page = () => {
  return <EditEventPage />;
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

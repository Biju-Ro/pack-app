import { StyleSheet, View, Text } from "react-native";
import React from "react";
import ContactListPage from "@/components/ContactList";

const Page = () => {
  return <ContactListPage />;
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

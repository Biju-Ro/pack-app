import { StyleSheet, View, Text } from "react-native";
import React from "react";
import ProfilePage from "@/components/ProfilePage";
import ProfileEdit from "@/components/ProfileEdit";
import ChatPage from "@/components/ChatPage";
import RotatingChatPage from "@/components/RotatingChat";

const Page = () => {
  return (
    <View style={styles.container}>
      <RotatingChatPage />;
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    width: "100%",
  },
});

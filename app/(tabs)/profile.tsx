import { StyleSheet, View, Text } from "react-native";
import React from "react";
import ProfilePage from "@/components/ProfilePage";

const Page = () => {
  return (
    <View style={styles.container}>
      <ProfilePage navigation={undefined} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

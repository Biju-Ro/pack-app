import { StyleSheet, View, Text } from "react-native";
import React from "react";

const Page = () => {
  return (
    <View style={styles.container}>
      <Text>Events Screen</Text>
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
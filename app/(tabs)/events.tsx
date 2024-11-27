import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import EventPage from "@/components/EventPage";

const Page = () => {
  return (
    <View style={styles.container}>
      <Text>Events Screen</Text>
      <StatusBar style="auto" />
      <EventPage/>
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

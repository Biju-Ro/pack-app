import { USERDATA, EVENTDATA, RACHATDATA, FLOORCHATDATA, ROTATINGCHATDATA } from "@/data/application";
import ApplicationContext from "@/contexts/ApplicationContext";
import { User, Event, RAChat, FloorChat, RotatingChat } from "@/types";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [users, setUsers] = useState<User[]>(USERDATA);
  const [events, setEvents] = useState<Event[]>(EVENTDATA);
  const [raChat, setRAChat] = useState<RAChat>(RACHATDATA);
  const [floorChat, setFloorChat] = useState<FloorChat>(FLOORCHATDATA);
  const [rotatingChat, setRotatingChat] = useState<RotatingChat>(ROTATINGCHATDATA);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      console.log("Showing main user in layout:", (users as User[])[0]);
    }
  }, [users, events, raChat, floorChat, rotatingChat, loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ApplicationContext.Provider value={{ users, setUsers, events, setEvents, raChat, setRAChat, floorChat, setFloorChat, rotatingChat, setRotatingChat}}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ApplicationContext.Provider>
  );
}

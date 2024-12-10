import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { TabBar } from "@/components/TabBar";
import ApplicationContext from "@/contexts/ApplicationContext";
import { FloorChat, RAChat, RotatingChat, User, Event} from "@/types";
import { EVENTDATA, FLOORCHATDATA, RACHATDATA, ROTATINGCHATDATA, USERDATA } from "@/data/application";

const TabLayout = () => {
  // const [users, setUsers] = useState<User[]>(USERDATA);
  // const [events, setEvents] = useState<Event[]>(EVENTDATA);
  // const [raChat, setRAChat] = useState<RAChat>(RACHATDATA);
  // const [floorChat, setFloorChat] = useState<FloorChat>(FLOORCHATDATA);
  // const [rotatingChat, setRotatingChat] = useState<RotatingChat>(ROTATINGCHATDATA);

  // useEffect(() => {
  //   console.log("Showing main user:", (users as User[])[0]);
  // }, [users]);

  return (
    // <ApplicationContext.Provider value={{ users, setUsers, events, setEvents, raChat, setRAChat, floorChat, setFloorChat, rotatingChat, setRotatingChat}}>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen name="index" options={{ title: "Chats" }} />
        <Tabs.Screen name="events" options={{ title: "Events" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    // </ApplicationContext.Provider>
  );
};

export default TabLayout;

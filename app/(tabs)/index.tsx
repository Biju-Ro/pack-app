import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ChatDashboard from "@/components/ChatDashboard";
import ApplicationContext from "@/contexts/ApplicationContext";
import { USERDATA, EVENTDATA, RACHATDATA, FLOORCHATDATA, ROTATINGCHATDATA } from "@/data/application";
import { User, Event, RAChat, FloorChat, RotatingChat } from "@/types";

const Page = () => {
  // const [users, setUsers] = useState<User[]>(USERDATA);
  // const [events, setEvents] = useState<Event[]>(EVENTDATA);
  // const [raChat, setRAChat] = useState<RAChat>(RACHATDATA);
  // const [floorChat, setFloorChat] = useState<FloorChat>(FLOORCHATDATA);
  // const [rotatingChat, setRotatingChat] = useState<RotatingChat>(ROTATINGCHATDATA);

  // useEffect(() => {
  //   console.log("Showing main user:", (users as User[])[0]);
  // }, [users, events]);

  return (
    // <ApplicationContext.Provider value={{ users, setUsers, events, setEvents, raChat, setRAChat, floorChat, setFloorChat, rotatingChat, setRotatingChat}}>
    <ChatDashboard />
    // </ApplicationContext.Provider>
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

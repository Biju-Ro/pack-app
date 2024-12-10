import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Event } from "@/types";
import useApplicationContext from "@/hooks/useApplicationContext";
import { USERDATA } from "@/data/application";

const EventPage = () => {
  // const [events, setEvents] = useState<Event[]>([
  //   {
  //     id: "1",
  //     name: "Summer Tech Conference",
  //     host: "Tech Innovations Inc.",
  //     date: "2024-07-15",
  //     time: "09:00 AM",
  //     location: "San Francisco Convention Center",
  //     tags: ["Technology", "Networking", "Innovation"],
  //     yesCount: 0,
  //     maybeCount: 0,
  //     noCount: 0,
  //   },
  //   {
  //     id: "2",
  //     name: "Startup Networking Night",
  //     host: "Founders Network",
  //     date: "2024-06-22",
  //     time: "06:30 PM",
  //     location: "Downtown Coworking Space",
  //     tags: ["Startups", "Networking", "Entrepreneurs"],
  //     yesCount: 0,
  //     maybeCount: 0,
  //     noCount: 0,
  //   },
  // ]);

  const {
    users,
    events,
    setEvents,
  } = useApplicationContext();

  // Call back function for comparing two dates (to be used in array sorting)
  function compareDates(dateA: Date, dateB: Date) {
    if (dateA > dateB) {
      return 1;
    } else if (dateB > dateA) {
      return -1;
    } else {
      return 0;
    }
  }

  const [attendingEvents, setAttendingEvents] = useState<Event[]>(events.filter((event) => event.yesVotes.includes(USERDATA[0].uid)).sort(
    (eventa, eventb) => compareDates(eventa.date, eventb.date)));
  const [confirmNoEvent, setConfirmNoEvent] = useState<Event | null>(null);

  useEffect(() => {
    console.log("Showing events in eventpage:", events);
  }, [events, users]);

  const handleAttendanceClick = (
    eventId: number,
    type: "yes" | "maybe" | "no"
  ) => {

    switch (type) {
      case "yes":
        break;
      default:
        break;
    }

    // working with this now
    const tempEvents = events;

    tempEvents.map((event) => {
      if (event.eid === eventId) {

        switch (type) {

          // If the user clicks the yes button
          case "yes":
            if (event.yesVotes.includes(USERDATA[0].uid)) {
              event.yesVotes.splice(event.yesVotes.indexOf(USERDATA[0].uid), 1);
              // Remove from attending events if already there
              if (attendingEvents.some((e) => e.eid === eventId)) {
                const tempAttendingEvents = attendingEvents;
                tempAttendingEvents.map((e) => {
                  if (e.eid === eventId) {
                    tempAttendingEvents.splice(tempAttendingEvents.indexOf(e), 1);
                    setAttendingEvents([...tempAttendingEvents]);
                  }
                });
              }
            }
            else {
              event.yesVotes.push(USERDATA[0].uid);
              if (event.noVotes.includes(USERDATA[0].uid)) {
                event.noVotes.splice(event.noVotes.indexOf(USERDATA[0].uid), 1);
              }
              if (event.maybeVotes.includes(USERDATA[0].uid)) {
                event.maybeVotes.splice(event.maybeVotes.indexOf(USERDATA[0].uid), 1);
              }
              // Add to attending events if not already there.
              setAttendingEvents([...attendingEvents, event]);
            }
            break;

          // If the user clicks the maybe button
          case "maybe":
            if (event.yesVotes.includes(USERDATA[0].uid)) {
              event.yesVotes.splice(event.yesVotes.indexOf(USERDATA[0].uid), 1);
              // Remove from attending events if already there
              if (attendingEvents.some((e) => e.eid === eventId)) {
                const tempAttendingEvents = attendingEvents;
                tempAttendingEvents.map((e) => {
                  if (e.eid === eventId) {
                    tempAttendingEvents.splice(tempAttendingEvents.indexOf(e), 1);
                    setAttendingEvents([...tempAttendingEvents]);
                  }
                });
              }
            }
            if (event.maybeVotes.includes(USERDATA[0].uid)) {
              event.maybeVotes.splice(event.noVotes.indexOf(USERDATA[0].uid), 1);
            }
            else {
              event.maybeVotes.push(USERDATA[0].uid);
            }
            if (event.noVotes.includes(USERDATA[0].uid)) {
              event.noVotes.splice(event.noVotes.indexOf(USERDATA[0].uid), 1);
            }
            break;

          // If the user clicks the No Button
          case "no":
            if (event.yesVotes.includes(USERDATA[0].uid)) {
              event.yesVotes.splice(event.yesVotes.indexOf(USERDATA[0].uid), 1);
              // Remove from attending events if already there
              if (attendingEvents.some((e) => e.eid === eventId)) {
                const tempAttendingEvents = attendingEvents;
                tempAttendingEvents.map((e) => {
                  if (e.eid === eventId) {
                    tempAttendingEvents.splice(tempAttendingEvents.indexOf(e), 1);
                    setAttendingEvents([...tempAttendingEvents]);
                  }
                });
              }
            }
            if (event.noVotes.includes(USERDATA[0].uid)) {
              event.noVotes.splice(event.noVotes.indexOf(USERDATA[0].uid), 1);
            } else {
              event.noVotes.push(USERDATA[0].uid);
            }
            if (event.maybeVotes.includes(USERDATA[0].uid)) {
              event.maybeVotes.splice(event.noVotes.indexOf(USERDATA[0].uid), 1);
            }
            break;
          default:
            break;
        }
      }
    });

    setEvents([...tempEvents]);
  };

  // const handleNoConfirmation = () => {
  //   if (confirmNoEvent) {
  //     setEvents((currentEvents) =>
  //       currentEvents.map((event) => {
  //         if (event.id === confirmNoEvent.id) {
  //           const updatedEvent = { ...event };

  //           // Remove from attending events if was 'yes'
  //           if (event.userResponse === "yes") {
  //             setAttendingEvents((prev) =>
  //               prev.filter((e) => e.id !== event.id)
  //             );
  //           }

  //           // Reset previous response counts
  //           if (event.userResponse === "yes")
  //             updatedEvent.yesCount = Math.max(0, updatedEvent.yesCount - 1);
  //           if (event.userResponse === "maybe")
  //             updatedEvent.maybeCount = Math.max(
  //               0,
  //               updatedEvent.maybeCount - 1
  //             );
  //           if (event.userResponse === "no")
  //             updatedEvent.noCount = Math.max(0, updatedEvent.noCount - 1);

  //           // Update 'no' response
  //           updatedEvent.noCount++;
  //           updatedEvent.userResponse = "no";

  //           return updatedEvent;
  //         }
  //         return event;
  //       })
  //     );

  //     // Close the confirmation dialog
  //     setConfirmNoEvent(null);
  //   }
  // };

  const renderEventCard = (event: Event, section: string) => (
    <View key={event.eid} style={styles.eventCard}>
      <Text style={styles.eventName}>{event.title}</Text>
      <View style={styles.eventDetails}>
        <Text style={styles.eventText}>Host: {users[event.hostuid].nickname}</Text>
        <Text style={styles.eventText}>Date: {event.date.toLocaleDateString()}</Text>
        <Text style={styles.eventText}>Time: {event.date.toLocaleTimeString().slice(0, -3)}</Text>
        <Text style={styles.eventText}>Location: {event.location}</Text>

        {/* Tags Section */}
        <View style={styles.tagsContainer}>
          {event.tags.map((tag, index) => (
            <View key={index} style={styles.tagPill}>
              <Text style={styles.tagText}>{tag.tagname}</Text>
            </View>
          ))}
        </View>

        {/* Attendance Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.attendanceButton,
              styles.yesButton,
              event.yesVotes.includes(USERDATA[0].uid) && styles.selectedYesButton,
            ]}
            onPress={() => handleAttendanceClick(event.eid, "yes")}
            // disabled={event.userResponse === "yes"}
          >
            <Text style={styles.buttonText}>Yes ({event.yesVotes.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.attendanceButton,
              styles.maybeButton,
              event.maybeVotes.includes(USERDATA[0].uid) && styles.selectedMaybeButton,
            ]}
            onPress={() => handleAttendanceClick(event.eid, "maybe")}
            //disabled={event.userResponse === "maybe"}
          >
            <Text style={styles.buttonText}>Maybe ({event.maybeVotes.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.attendanceButton,
              styles.noButton,
              event.noVotes.includes(USERDATA[0].uid) && styles.selectedNoButton,
            ]}
            onPress={() => handleAttendanceClick(event.eid, "no")}
            //disabled={event.userResponse === "no"}
          >
            <Text style={styles.buttonText}>No ({event.noVotes.length})</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        visible={!!confirmNoEvent}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Event Declination</Text>
            <Text style={styles.modalText}>
              Are you sure you want to mark "{confirmNoEvent?.title}" as "No"?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setConfirmNoEvent(null)}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                //onPress={handleNoConfirmation}
              >
                <Text style={styles.modalConfirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Events</Text>
        <TouchableOpacity style={styles.addButton}>
          <Link href={"/newevent"}>
            <Ionicons name="add" size={24} color="black" />
          </Link>
        </TouchableOpacity>
      </View>

      {/* Event Sections */}
      <ScrollView>
        {attendingEvents.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Events I'm Attending</Text>
            {events.filter((event) => event.date > new Date() && attendingEvents.includes(event)).length > 0 ? (
            <>
            {events.filter((event) => event.date > new Date() && attendingEvents.includes(event)).sort((eventa, eventb) => compareDates(eventa.date, eventb.date)).map((event) => renderEventCard(event, "attending"))}
            </>
          ) : (
            <Text style={styles.noEventsText}>No Events listed as Attending</Text>
          )}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Events</Text>
          {events.filter((event) => event.date.getDay() === new Date().getDay() && event.date > new Date() && !attendingEvents.includes(event)).length > 0 ? (
            <>
            {events.filter((event) => event.date.getDay() === new Date().getDay() && event.date > new Date() && !attendingEvents.includes(event)).sort((eventa, eventb) => compareDates(eventa.date, eventb.date)).map((event) => renderEventCard(event, "today"))}
            </>
          ) : (
            <Text style={styles.noEventsText}>No unmarked events today</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {events.filter((event) => event.date > new Date()).length > 0 ? (
            <>
            {events.filter((event) => event.date > new Date() && event.date.getDay() != new Date().getDay() && !attendingEvents.includes(event)).sort((eventa, eventb) => compareDates(eventa.date, eventb.date)).map((event) => renderEventCard(event, "upcoming"))}
            </>
          ) : (
            <Text style={styles.noEventsText}>No upcoming events</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Events</Text>
          {events.filter((event) => event.date < new Date()).length > 0 ? (
            <>
            {events.filter((event) => event.date < new Date()).sort((eventa, eventb) => compareDates(eventa.date, eventb.date)).map((event) => renderEventCard(event, "past"))}
            </>
          ) : (
            <Text style={styles.noEventsText}>No past events</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  addButton: {
    padding: 5,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  noEventsText: {
    color: "black",
    textAlign: "center",
  },
  eventCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  eventDetails: {
    marginBottom: 10,
  },
  eventText: {
    color: "black",
    marginBottom: 5,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  tagPill: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    color: "white",
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  attendanceButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1,
  },
  yesButton: {
    borderColor: "green",
  },
  maybeButton: {
    borderColor: "orange",
  },
  noButton: {
    borderColor: "red",
  },
  buttonText: {
    textAlign: "center",
    color: "black",
  },
  selectedYesButton: {
    backgroundColor: "rgba(0,255,0,0.1)",
  },
  selectedMaybeButton: {
    backgroundColor: "rgba(255,255,0,0.1)",
  },
  selectedNoButton: {
    backgroundColor: "rgba(255,0,0,0.1)",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "black",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalCancelButton: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  modalConfirmButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  modalCancelButtonText: {
    color: "black",
    textAlign: "center",
  },
  modalConfirmButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default EventPage;

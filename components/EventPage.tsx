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
import { Link, useRouter } from "expo-router";
import { Event } from "@/types";
import useApplicationContext from "@/hooks/useApplicationContext";
import { USERDATA } from "@/data/application";

const EventPage = () => {
  const router = useRouter();
  const { users, events, setEvents } = useApplicationContext();

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

  const [attendingEvents, setAttendingEvents] = useState<Event[]>(
    events
      .filter((event) => event.yesVotes.includes(USERDATA[0].uid))
      .sort((eventa, eventb) => compareDates(eventa.date, eventb.date))
  );
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
                    tempAttendingEvents.splice(
                      tempAttendingEvents.indexOf(e),
                      1
                    );
                    setAttendingEvents([...tempAttendingEvents]);
                  }
                });
              }
            } else {
              event.yesVotes.push(USERDATA[0].uid);
              if (event.noVotes.includes(USERDATA[0].uid)) {
                event.noVotes.splice(event.noVotes.indexOf(USERDATA[0].uid), 1);
              }
              if (event.maybeVotes.includes(USERDATA[0].uid)) {
                event.maybeVotes.splice(
                  event.maybeVotes.indexOf(USERDATA[0].uid),
                  1
                );
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
                    tempAttendingEvents.splice(
                      tempAttendingEvents.indexOf(e),
                      1
                    );
                    setAttendingEvents([...tempAttendingEvents]);
                  }
                });
              }
            }
            if (event.maybeVotes.includes(USERDATA[0].uid)) {
              event.maybeVotes.splice(
                event.maybeVotes.indexOf(USERDATA[0].uid),
                1
              );
            } else {
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

              if (attendingEvents.some((e) => e.eid === eventId)) {
                const tempAttendingEvents = attendingEvents;
                tempAttendingEvents.map((e) => {
                  if (e.eid === eventId) {
                    tempAttendingEvents.splice(
                      tempAttendingEvents.indexOf(e),
                      1
                    );
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
              event.maybeVotes.splice(
                event.maybeVotes.indexOf(USERDATA[0].uid),
                1
              );
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

  const renderEventCard = (event: Event) => (
    <View key={event.eid} style={styles.eventCard}>
      <View style={styles.eventCardHeader}>
        <Text style={styles.eventTitle} numberOfLines={1}>
          {event.title}
        </Text>
        <View style={styles.eventHeaderRight}>
          <View style={styles.eventDateBadge}>
            <Text style={styles.eventDateText}>
              {event.date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </Text>
          </View>
          {event.hostuid === USERDATA[0].uid && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push(`/editevent/${event.eid}`)}
            >
              <Ionicons name="pencil" size={16} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View
        style={[
          styles.eventCardBody,
          event.hostuid === USERDATA[0].uid && styles.userCreatedEventBody,
        ]}
      >
        <View style={styles.eventDetailsContainer}>
          <View style={styles.eventDetailRow}>
            <Ionicons name="person-outline" size={16} color="#666" />
            <Text style={styles.eventDetailText}>
              {users[event.hostuid].nickname}
            </Text>
          </View>
          <View style={styles.eventDetailRow}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.eventDetailText} numberOfLines={1}>
              {event.location}
            </Text>
          </View>
          <View style={styles.eventDetailRow}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.eventDetailText}>
              {event.date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        </View>

        <View style={styles.tagContainer}>
          {event.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tagPill}>
              <Text style={styles.tagText}>{tag.tagname}</Text>
            </View>
          ))}
        </View>

        <View style={styles.attendanceButtonContainer}>
          <TouchableOpacity
            style={[
              styles.attendanceButton,
              styles.yesButton,
              event.yesVotes.includes(USERDATA[0].uid) &&
                styles.selectedYesButton,
            ]}
            onPress={() => handleAttendanceClick(event.eid, "yes")}
          >
            <Text style={styles.attendanceButtonText}>
              Yes ({event.yesVotes.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.attendanceButton,
              styles.maybeButton,
              event.maybeVotes.includes(USERDATA[0].uid) &&
                styles.selectedMaybeButton,
            ]}
            onPress={() => handleAttendanceClick(event.eid, "maybe")}
          >
            <Text style={styles.attendanceButtonText}>
              Maybe ({event.maybeVotes.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.attendanceButton,
              styles.noButton,
              event.noVotes.includes(USERDATA[0].uid) &&
                styles.selectedNoButton,
            ]}
            onPress={() => handleAttendanceClick(event.eid, "no")}
          >
            <Text style={styles.attendanceButtonText}>
              No ({event.noVotes.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEventSection = (
    title: string,
    filterCondition: (event: Event) => boolean,
    emptyMessage: string
  ) => {
    const filteredEvents = events
      .filter(filterCondition)
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    if (filteredEvents.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {filteredEvents.length > 0 ? (
          filteredEvents.map(renderEventCard)
        ) : (
          <Text style={styles.emptyStateText}>{emptyMessage}</Text>
        )}
      </View>
    );
  };

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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
        <TouchableOpacity
          style={styles.myEventsButton}
          onPress={() => router.push("/myevents")}
        >
          <Text style={styles.myEventsTitle}>My Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => router.push("/newevent")}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {renderEventSection(
          "Attending",
          (event) =>
            event.date > new Date() && event.yesVotes.includes(USERDATA[0].uid),
          "No upcoming events you're attending"
        )}

        {renderEventSection(
          "Today's Events",
          (event) =>
            event.date.getDay() === new Date().getDay() &&
            event.date > new Date(),
          "No events today"
        )}

        {renderEventSection(
          "Upcoming Events",
          (event) =>
            event.date > new Date() &&
            event.date.getDay() !== new Date().getDay() &&
            !event.yesVotes.includes(USERDATA[0].uid),
          "No upcoming events"
        )}

        {renderEventSection(
          "Past Events",
          (event) => event.date < new Date(),
          "No past events"
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  myEventsButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "flex-end",
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FF4444",
    paddingRight: 70,
  },
  myEventsTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  plusButton: {
    alignItems: "flex-end",
    backgroundColor: "red",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  scrollViewContent: {
    paddingVertical: 15,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  eventCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  eventTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  eventDateBadge: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  eventDateText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  eventCardBody: {
    padding: 15,
  },
  eventDetailsContainer: {
    marginBottom: 15,
  },
  eventDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  eventDetailText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
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
    fontSize: 12,
    color: "white",
  },
  attendanceButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  attendanceButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
  },
  attendanceButtonText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  yesButton: {
    borderColor: "#4CAF50",
  },
  maybeButton: {
    borderColor: "#FFC107",
  },
  noButton: {
    borderColor: "#F44336",
  },
  selectedYesButton: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
  },
  selectedMaybeButton: {
    backgroundColor: "rgba(255, 193, 7, 0.1)",
  },
  selectedNoButton: {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
  },
  emptyStateText: {
    textAlign: "center",
    color: "#999",
    fontStyle: "italic",
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
  eventCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  eventHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    marginLeft: 10,
    padding: 5,
  },
  userCreatedEventBody: {
    backgroundColor: "rgba(255, 68, 68, 0.05)", // Light shade of red
  },
});

export default EventPage;

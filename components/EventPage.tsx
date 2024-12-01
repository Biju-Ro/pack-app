import React, { useState } from "react";
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

interface Event {
  id: string;
  name: string;
  host: string;
  date: string;
  time: string;
  location: string;
  tags: string[];
  yesCount: number;
  maybeCount: number;
  noCount: number;
  userResponse?: "yes" | "maybe" | "no";
}

const EventPage = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      name: "Summer Tech Conference",
      host: "Tech Innovations Inc.",
      date: "2024-07-15",
      time: "09:00 AM",
      location: "San Francisco Convention Center",
      tags: ["Technology", "Networking", "Innovation"],
      yesCount: 0,
      maybeCount: 0,
      noCount: 0,
    },
    {
      id: "2",
      name: "Startup Networking Night",
      host: "Founders Network",
      date: "2024-06-22",
      time: "06:30 PM",
      location: "Downtown Coworking Space",
      tags: ["Startups", "Networking", "Entrepreneurs"],
      yesCount: 0,
      maybeCount: 0,
      noCount: 0,
    },
  ]);

  const [attendingEvents, setAttendingEvents] = useState<Event[]>([]);
  const [confirmNoEvent, setConfirmNoEvent] = useState<Event | null>(null);

  const handleAttendanceClick = (
    eventId: string,
    type: "yes" | "maybe" | "no"
  ) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) => {
        if (event.id === eventId) {
          const updatedEvent = { ...event };

          // Reset previous response counts
          if (event.userResponse === "yes")
            updatedEvent.yesCount = Math.max(0, updatedEvent.yesCount - 1);
          if (event.userResponse === "maybe")
            updatedEvent.maybeCount = Math.max(0, updatedEvent.maybeCount - 1);
          if (event.userResponse === "no")
            updatedEvent.noCount = Math.max(0, updatedEvent.noCount - 1);

          // Update new response
          switch (type) {
            case "yes":
              updatedEvent.yesCount++;
              updatedEvent.userResponse = "yes";

              // Add to attending events if not already there
              if (!attendingEvents.some((e) => e.id === eventId)) {
                setAttendingEvents((prev) => [...prev, updatedEvent]);
              }
              break;
            case "maybe":
              updatedEvent.maybeCount++;
              updatedEvent.userResponse = "maybe";
              break;
            case "no":
              // Show confirmation dialog for 'no'
              setConfirmNoEvent(event);
              return event;
          }

          return updatedEvent;
        }
        return event;
      })
    );
  };

  const handleNoConfirmation = () => {
    if (confirmNoEvent) {
      setEvents((currentEvents) =>
        currentEvents.map((event) => {
          if (event.id === confirmNoEvent.id) {
            const updatedEvent = { ...event };

            // Remove from attending events if was 'yes'
            if (event.userResponse === "yes") {
              setAttendingEvents((prev) =>
                prev.filter((e) => e.id !== event.id)
              );
            }

            // Reset previous response counts
            if (event.userResponse === "yes")
              updatedEvent.yesCount = Math.max(0, updatedEvent.yesCount - 1);
            if (event.userResponse === "maybe")
              updatedEvent.maybeCount = Math.max(
                0,
                updatedEvent.maybeCount - 1
              );
            if (event.userResponse === "no")
              updatedEvent.noCount = Math.max(0, updatedEvent.noCount - 1);

            // Update 'no' response
            updatedEvent.noCount++;
            updatedEvent.userResponse = "no";

            return updatedEvent;
          }
          return event;
        })
      );

      // Close the confirmation dialog
      setConfirmNoEvent(null);
    }
  };

  const renderEventCard = (event: Event, section: string) => (
    <View key={event.id} style={styles.eventCard}>
      <Text style={styles.eventName}>{event.name}</Text>
      <View style={styles.eventDetails}>
        <Text style={styles.eventText}>Host: {event.host}</Text>
        <Text style={styles.eventText}>Date: {event.date}</Text>
        <Text style={styles.eventText}>Time: {event.time}</Text>
        <Text style={styles.eventText}>Location: {event.location}</Text>

        {/* Tags Section */}
        <View style={styles.tagsContainer}>
          {event.tags.map((tag, index) => (
            <View key={index} style={styles.tagPill}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Attendance Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.attendanceButton,
              styles.yesButton,
              event.userResponse === "yes" && styles.selectedButton,
            ]}
            onPress={() => handleAttendanceClick(event.id, "yes")}
            disabled={event.userResponse === "yes"}
          >
            <Text style={styles.buttonText}>Yes ({event.yesCount})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.attendanceButton,
              styles.maybeButton,
              event.userResponse === "maybe" && styles.selectedButton,
            ]}
            onPress={() => handleAttendanceClick(event.id, "maybe")}
            disabled={event.userResponse === "maybe"}
          >
            <Text style={styles.buttonText}>Maybe ({event.maybeCount})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.attendanceButton,
              styles.noButton,
              event.userResponse === "no" && styles.selectedButton,
            ]}
            onPress={() => handleAttendanceClick(event.id, "no")}
            disabled={event.userResponse === "no"}
          >
            <Text style={styles.buttonText}>No ({event.noCount})</Text>
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
              Are you sure you want to mark "{confirmNoEvent?.name}" as "No"?
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
                onPress={handleNoConfirmation}
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
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Event Sections */}
      <ScrollView>
        {attendingEvents.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Events I'm Attending</Text>
            {attendingEvents.map((event) =>
              renderEventCard(event, "attending")
            )}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Events</Text>
          <Text style={styles.noEventsText}>No events today</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {events.map((event) => renderEventCard(event, "upcoming"))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Events</Text>
          <Text style={styles.noEventsText}>No past events</Text>
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
  selectedButton: {
    backgroundColor: "rgba(0,255,0,0.1)",
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

import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import useApplicationContext from "@/hooks/useApplicationContext";
import { Event } from "@/types";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function MyEventsPage() {
  const router = useRouter();
  const { users, events } = useApplicationContext();
  const currentUserUid = users[0].uid;

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date();
    const myEvents = events.filter((event) => event.hostuid === currentUserUid);

    return {
      upcomingEvents: myEvents
        .filter((event) => new Date(event.date) > now)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
      pastEvents: myEvents
        .filter((event) => new Date(event.date) <= now)
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
    };
  }, [events, currentUserUid]);

  const renderEventCard = (event: Event) => (
    <View key={event.eid} style={styles.eventCard}>
      <View style={styles.eventCardContent}>
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{event.title}</Text>
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
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.eventDetailText}>
                {new Date(event.date).toLocaleDateString([], {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </View>
            <View style={styles.eventDetailRow}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.eventDetailText}>
                {new Date(event.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          </View>
          <Stack.Screen options={{ headerShown: false }} />
          <View style={styles.eventTagContainer}>
            {event.tags.map((tag, index) => (
              <View key={index} style={styles.eventTag}>
                <Text style={styles.eventTagText}>{tag.tagname}</Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push(`/editevent/${event.eid}`)}
        >
          <Ionicons name="pencil" size={16} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/events")}
        >
          <FontAwesome5 name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Events</Text>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => router.push("/newevent")}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {upcomingEvents.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            {upcomingEvents.map(renderEventCard)}
          </View>
        )}

        {pastEvents.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Past Events</Text>
            {pastEvents.map(renderEventCard)}
          </View>
        )}

        {upcomingEvents.length === 0 && pastEvents.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              You haven't created any events yet
            </Text>
            <TouchableOpacity
              style={styles.createEventButton}
              onPress={() => router.push("/newevent")}
            >
              <Text style={styles.createEventButtonText}>
                Create First Event
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  backButton: {
    width: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  plusButton: {
    alignItems: "flex-end",
    backgroundColor: "red",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  scrollContent: {
    padding: 20,
  },
  headerBackButton: {
    color: "#FF4444",
    fontSize: 16,
  },
  headerPlusButton: {
    color: "black",
    fontSize: 24,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
  eventCard: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  eventCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  eventDetails: {
    flex: 1,
    marginRight: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  eventDetailsContainer: {
    marginBottom: 10,
  },
  eventDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  eventDetailText: {
    marginLeft: 10,
    color: "#666",
  },
  eventTagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  eventTag: {
    backgroundColor: "red",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  eventTagText: {
    color: "white",
    fontSize: 12,
  },
  editButton: {
    padding: 10,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  createEventButton: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  createEventButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

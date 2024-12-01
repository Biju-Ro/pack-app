import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import {
  Dialog,
  Portal,
  Button,
  Provider as PaperProvider,
} from "react-native-paper";

const EventCreationScreen = () => {
  const [eventDetails, setEventDetails] = useState({
    name: "",
    banner: null,
    time: new Date(),
    date: new Date(),
    location: "",
    maxPeople: "",
  });

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showBackDialog, setShowBackDialog] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleImageUpload = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };

  const handleDateChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || eventDetails.date;
    setShowDatePicker(Platform.OS === "ios");
    setEventDetails((prev) => ({
      ...prev,
      date: currentDate,
    }));
  };

  const handleTimeChange = (event: any, selectedTime: Date) => {
    const currentTime = selectedTime || eventDetails.time;
    setShowTimePicker(Platform.OS === "ios");
    setEventDetails((prev) => ({
      ...prev,
      time: currentTime,
    }));
  };

  const validateForm = () => {
    const { name, banner, location, maxPeople } = eventDetails;
    return name && banner && location && maxPeople;
  };

  const handleSave = () => {
    if (validateForm()) {
      setShowSaveDialog(true);
    } else {
      alert("Please fill in all fields");
    }
  };

  const confirmSave = () => {
    // Actual save logic would go here
    console.log("Event saved:", eventDetails);
    setShowSaveDialog(false);
  };

  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView
          contentContainerStyle={{
            padding: 20,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Create New Event
          </Text>

          {/* Banner Upload */}
          <TouchableOpacity
            onPress={handleImageUpload}
            style={{
              height: 200,
              backgroundColor: "#f0f0f0",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            {eventDetails.banner ? (
              <Image
                source={{ uri: eventDetails.banner }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                }}
                resizeMode="cover"
              />
            ) : (
              <Text style={{ color: "gray" }}>Tap to Upload Banner</Text>
            )}
          </TouchableOpacity>

          {/* Event Name */}
          <Text style={styles.label}>Event Name</Text>
          <TextInput
            style={styles.input}
            value={eventDetails.name}
            onChangeText={(text) =>
              setEventDetails((prev) => ({
                ...prev,
                name: text,
              }))
            }
            placeholder="Enter event name"
          />

          {/* Date Picker */}
          <Text style={styles.label}>Event Date</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.input}
          >
            <Text>{eventDetails.date.toLocaleDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              testID="datePicker"
              value={eventDetails.date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}

          {/* Time Picker */}
          <Text style={styles.label}>Event Time</Text>
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            style={styles.input}
          >
            <Text>{eventDetails.time.toLocaleTimeString()}</Text>
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              testID="timePicker"
              value={eventDetails.time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )}

          {/* Location */}
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={eventDetails.location}
            onChangeText={(text) =>
              setEventDetails((prev) => ({
                ...prev,
                location: text,
              }))
            }
            placeholder="Enter event location"
          />

          {/* Max People */}
          <Text style={styles.label}>Maximum Attendees</Text>
          <TextInput
            style={styles.input}
            value={eventDetails.maxPeople}
            onChangeText={(text) =>
              setEventDetails((prev) => ({
                ...prev,
                maxPeople: text,
              }))
            }
            placeholder="Maximum number of people"
            keyboardType="numeric"
          />

          {/* Action Buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={() => setShowBackDialog(true)}>
              <Text style={{ color: "black" }}>Go Back</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSave}>
              <Text style={{ color: "white" }}>Save Event</Text>
            </TouchableOpacity>
          </View>

          {/* Save Confirmation Dialog */}
          <Portal>
            <Dialog
              visible={showSaveDialog}
              onDismiss={() => setShowSaveDialog(false)}
            >
              <Dialog.Title>Confirm Save</Dialog.Title>
              <Dialog.Content>
                <Text>Are you sure you want to save this event?</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setShowSaveDialog(false)}>Cancel</Button>
                <Button onPress={confirmSave}>Confirm</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          {/* Back Confirmation Dialog */}
          <Portal>
            <Dialog
              visible={showBackDialog}
              onDismiss={() => setShowBackDialog(false)}
            >
              <Dialog.Title>Confirm Go Back</Dialog.Title>
              <Dialog.Content>
                <Text>
                  Are you sure you want to go back? Unsaved changes will be
                  lost.
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setShowBackDialog(false)}>Cancel</Button>
                <Button
                  onPress={() => {
                    // Navigation logic would go here
                    setShowBackDialog(false);
                  }}
                >
                  Confirm
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = {
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "white",
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
};

export default EventCreationScreen;

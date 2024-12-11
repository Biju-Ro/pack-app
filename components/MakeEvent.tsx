import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import useApplicationContext from "@/hooks/useApplicationContext";
import { Event, User, Tag } from "@/types";
import { USERDATA, TAGDATA, EVENTDATA } from "@/data/application";

export default function NewEventPage() {
  const router = useRouter();
  const { users, events, setEvents } = useApplicationContext();

  useEffect(() => {}, [users, events]);

  const [formData, setFormData] = useState<Event>({
    eid: events.length,
    title: "",
    hostname: users[0].nickname,
    hostuid: users[0].uid,
    date: new Date(),
    location: "",
    tags: [],
    yesVotes: [users[0].uid],
    maybeVotes: [],
    noVotes: [],
  });

  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [isSaveModalVisible, setSaveModalVisible] = useState(false);
  const [isCancelModalVisible, setCancelModalVisible] = useState(false);

  const handleTagChange = (index: number, text: string) => {
    const newTags = [...formData.tags];
    newTags[index].tagname = text;
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, { tid: TAGDATA.length, tagname: "" }],
    }));
  };

  const removeTag = (index: number) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const isEventValid = () => {
    const isTitleFilled = formData.title.trim() !== "";
    const isLocationFilled = formData.location.trim() !== "";

    const areTagsFilled =
      formData.tags.length > 0 &&
      formData.tags.every((tag) => tag.tagname.trim() !== "");

    // Check if date is in the future
    const isDateValid = formData.date > new Date();

    return isTitleFilled && isLocationFilled && areTagsFilled && isDateValid;
  };

  const saveEvent = async () => {
    try {
      console.log("Saving event:", formData);

      formData.eid = events.length;
      setEvents([...events, formData]);
    } catch (error) {
      console.error("Error saving event:", error);
      Alert.alert("Save Error", "There was an error saving the event.");
    }
  };

  const handleCancel = () => {
    if (!formData.title && !formData.location && formData.tags.length === 0) {
      router.push("/events");
      return;
    }

    setCancelModalVisible(true);
  };

  const handleDateConfirm = () => {
    setFormData((prev) => ({ ...prev, date: tempDate }));
    setDateModalVisible(false);
  };

  const handleTimeConfirm = () => {
    setFormData((prev) => ({
      ...prev,
      date: new Date(
        prev.date.getFullYear(),
        prev.date.getMonth(),
        prev.date.getDate(),
        tempDate.getHours(),
        tempDate.getMinutes()
      ),
    }));
    setTimeModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Name</Text>
            <TextInput
              style={styles.input}
              value={formData.title}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, title: text }))
              }
              placeholder="Enter event name"
            />

            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                setTempDate(formData.date);
                setDateModalVisible(true);
              }}
            >
              <Text>{formData.date.toLocaleDateString()}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Time</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                setTempDate(formData.date);
                setTimeModalVisible(true);
              }}
            >
              <Text>
                {formData.date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, location: text }))
              }
              placeholder="Enter event location"
            />

            {/* Tags Section */}
            <Text style={styles.label}>Tags</Text>
            {formData.tags.map((tag, index) => (
              <View key={index} style={styles.tagInputContainer}>
                <TextInput
                  style={styles.tagInput}
                  value={tag.tagname}
                  onChangeText={(text) => handleTagChange(index, text)}
                  placeholder="Enter tag"
                />
                <TouchableOpacity
                  onPress={() => removeTag(index)}
                  style={styles.removeTagButton}
                >
                  <Text style={styles.removeTagText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={addTag} style={styles.addTagButton}>
              <Text style={styles.addTagText}>+ Add Tag</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button Container */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.saveButton,
            !isEventValid() && styles.disabledSaveButton,
          ]}
          disabled={!isEventValid()}
          onPress={() => {
            if (isEventValid()) {
              setSaveModalVisible(true);
            }
          }}
        >
          <Text
            style={[
              styles.saveButtonText,
              !isEventValid() && styles.disabledSaveButtonText,
            ]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDateModalVisible}
        onRequestClose={() => setDateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date</Text>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                setTempDate(selectedDate || tempDate);
              }}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setDateModalVisible(false)}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleDateConfirm}
              >
                <Text style={styles.modalConfirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Time Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isTimeModalVisible}
        onRequestClose={() => setTimeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Time</Text>
            <DateTimePicker
              value={tempDate}
              mode="time"
              display="spinner"
              onChange={(event, selectedTime) => {
                setTempDate(selectedTime || tempDate);
              }}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setTimeModalVisible(false)}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleTimeConfirm}
              >
                <Text style={styles.modalConfirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Save Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSaveModalVisible}
        onRequestClose={() => setSaveModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Save Event</Text>
            <Text style={styles.modalText}>
              Do you want to save this event?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setSaveModalVisible(false)}
              >
                <Text style={styles.modalCancelButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={() => {
                  saveEvent();
                  setSaveModalVisible(false);
                  router.push("/events");
                }}
              >
                <Text style={styles.modalConfirmButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Cancel Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCancelModalVisible}
        onRequestClose={() => setCancelModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Discard Event</Text>
            <Text style={styles.modalText}>
              Are you sure you want to cancel? All unsaved changes will be lost.
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setCancelModalVisible(false)}
              >
                <Text style={styles.modalCancelButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={() => {
                  setCancelModalVisible(false);
                  router.push("/events");
                }}
              >
                <Text style={styles.modalConfirmButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputGroup: {
    marginTop: 10,
  },
  label: {
    color: "#333",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FF4444",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  tagInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  tagInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#FF4444",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  removeTagButton: {
    backgroundColor: "#FF4444",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  removeTagText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  addTagButton: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFF0F0",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#FF4444",
  },
  addTagText: {
    color: "#FF4444",
    fontWeight: "bold",
  },
  bottomButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "white",
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF4444",
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FF4444",
    fontWeight: "bold",
  },
  saveButton: {
    flex: 1,
    marginLeft: 10,
    padding: 15,
    backgroundColor: "#FF4444",
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#FF4444",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalCancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF4444",
    borderRadius: 10,
    alignItems: "center",
  },
  modalCancelButtonText: {
    color: "#FF4444",
    fontWeight: "bold",
  },
  modalConfirmButton: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#FF4444",
    borderRadius: 10,
    alignItems: "center",
  },
  modalConfirmButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  disabledSaveButton: {
    backgroundColor: "#FFB3B3", // Lighter red when disabled
    opacity: 0.5,
  },
  disabledSaveButtonText: {
    color: "#666", // Grayed out text
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#FF4444",
    padding: 10,
    borderRadius: 5,
    width: "30%",
    textAlign: "center",
  },
  dateSeparator: {
    fontSize: 18,
    color: "#333",
  },
  timeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeInput: {
    borderWidth: 1,
    borderColor: "#FF4444",
    padding: 10,
    borderRadius: 5,
    width: "30%",
    textAlign: "center",
  },
  timeSeparator: {
    fontSize: 18,
    color: "#333",
    marginHorizontal: 5,
  },
  ampmButton: {
    borderWidth: 1,
    borderColor: "#FF4444",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  ampmButtonText: {
    color: "#FF4444",
    fontWeight: "bold",
  },
});

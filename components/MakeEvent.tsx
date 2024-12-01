import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function NewEventPage() {
  const [formData, setFormData] = useState({
    name: "",
    date: new Date(),
    time: new Date(),
    location: "",
    tags: [""],
  });

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isSaveModalVisible, setSaveModalVisible] = useState(false);

  // Function to handle tag input
  const handleTagChange = (index, text) => {
    const newTags = [...formData.tags];
    newTags[index] = text;
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  // Function to add a new tag
  const addTag = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, ""],
    }));
  };

  // Function to remove a tag
  const removeTag = (index) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  // Save event function
  const saveEvent = async () => {
    try {
      // Note: In a real app, you'd typically save to a backend or secure local storage
      console.log("Saving event:", formData);
      // Implement your actual save logic here
    } catch (error) {
      console.error("Error saving event:", error);
    }
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
              value={formData.name}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, name: text }))
              }
              placeholder="Enter event name"
            />

            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setDatePickerVisible(true)}
            >
              <Text>{formData.date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {isDatePickerVisible && (
              <DateTimePicker
                value={formData.date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setDatePickerVisible(false);
                  setFormData((prev) => ({
                    ...prev,
                    date: selectedDate || prev.date,
                  }));
                }}
              />
            )}

            <Text style={styles.label}>Time</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setTimePickerVisible(true)}
            >
              <Text>
                {formData.time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>
            {isTimePickerVisible && (
              <DateTimePicker
                value={formData.time}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setTimePickerVisible(false);
                  setFormData((prev) => ({
                    ...prev,
                    time: selectedTime || prev.time,
                  }));
                }}
              />
            )}

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
                  value={tag}
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
        <Link href="/events" asChild>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => setSaveModalVisible(true)}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

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
              <Link href="/events" asChild>
                <TouchableOpacity
                  style={styles.modalConfirmButton}
                  onPress={() => {
                    saveEvent();
                    setSaveModalVisible(false);
                  }}
                >
                  <Text style={styles.modalConfirmButtonText}>Yes</Text>
                </TouchableOpacity>
              </Link>
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
});

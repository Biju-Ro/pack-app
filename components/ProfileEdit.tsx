import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

// Import user data from a static source
import initialUserData from "../data/user.json";

type UserData = typeof initialUserData;

export default function ProfileEditor() {
  // State to manage form data
  const [formData, setFormData] = useState<UserData>({
    ...initialUserData,
  });

  // State for managing modals
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [isSaveModalVisible, setSaveModalVisible] = useState(false);
  const [isDeleteTagModalVisible, setDeleteTagModalVisible] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<number | null>(null);

  // State for managing profile image
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Check and request permissions on component mount
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  // Function to save profile image
  const saveProfileImage = async (imageUri: string) => {
    try {
      // Create a directory for profile images if it doesn't exist
      const profileImageDir = `${FileSystem.documentDirectory}profile_images/`;
      await FileSystem.makeDirectoryAsync(profileImageDir, {
        intermediates: true,
      });

      // Generate a unique filename
      const filename = `profile_${Date.now()}.jpg`;
      const destPath = `${profileImageDir}${filename}`;

      // Copy the image to the app's local storage
      await FileSystem.copyAsync({ from: imageUri, to: destPath });

      return destPath;
    } catch (error) {
      console.error("Error saving profile image:", error);
      return null;
    }
  };

  // Image picker function
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const savedImageUri = await saveProfileImage(result.assets[0].uri);
        if (savedImageUri) {
          setProfileImage(savedImageUri);
        }
      }
    } catch (error) {
      console.error("Image picking error:", error);
    }
  };

  // Function to handle tag input
  const handleTagChange = (index: number, text: string) => {
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

  // Function to remove a tag with confirmation
  const confirmRemoveTag = (index: number) => {
    setTagToDelete(index);
    setDeleteTagModalVisible(true);
  };

  // Actual tag removal function
  const removeTag = () => {
    if (tagToDelete !== null) {
      const newTags = formData.tags.filter((_, i) => i !== tagToDelete);
      setFormData((prev) => ({ ...prev, tags: newTags }));
      setDeleteTagModalVisible(false);
      setTagToDelete(null);
    }
  };

  // Save profile function
  const saveProfile = async () => {
    try {
      // Note: In a real app, you'd typically save to a backend or secure local storage
      console.log("Saving profile:", formData);

      // Implement your actual save logic here
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          {/* Profile Image Section */}
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : require("../assets/default-profile.png")
                }
                style={styles.profileImage}
              />
              <Text style={styles.imageEditText}>Edit Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Personal Info Inputs */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={formData.first_name}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, first_name: text }))
              }
            />

            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={formData.last_name}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, last_name: text }))
              }
            />

            <Text style={styles.label}>Major</Text>
            <TextInput
              style={styles.input}
              value={formData.major}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, major: text }))
              }
            />

            <Text style={styles.label}>Minor</Text>
            <TextInput
              style={styles.input}
              value={formData.minor}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, minor: text }))
              }
            />

            <Text style={styles.label}>Dorm</Text>
            <TextInput
              style={styles.input}
              value={formData.dorm}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, dorm: text }))
              }
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
                  onPress={() => confirmRemoveTag(index)}
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
        <Link href="/profile" asChild>
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

      {/* Delete Tag Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteTagModalVisible}
        onRequestClose={() => setDeleteTagModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Tag</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this tag?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setDeleteTagModalVisible(false)}
              >
                <Text style={styles.modalCancelButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={removeTag}
              >
                <Text style={styles.modalConfirmButtonText}>Yes</Text>
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
            <Text style={styles.modalTitle}>Save Changes</Text>
            <Text style={styles.modalText}>
              Do you want to save the changes you made?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setSaveModalVisible(false)}
              >
                <Text style={styles.modalCancelButtonText}>No</Text>
              </TouchableOpacity>
              <Link href="/profile" asChild>
                <TouchableOpacity
                  style={styles.modalConfirmButton}
                  onPress={() => setSaveModalVisible(false)}
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
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#FF4444",
  },
  imageEditText: {
    color: "#FF4444",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
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

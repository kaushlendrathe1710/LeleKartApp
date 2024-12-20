import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CustomModal = ({
  visible,
  onClose,
  onOk,
  onCancel,
  title = "Permission Needed",
  message = "This app needs permission to proceed. Do you allow it?",
}) => {
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current; // Start below screen
  const [isModalVisible, setIsModalVisible] = useState(visible); // Controls actual Modal visibility

  useEffect(() => {
    if (visible) {
      // Make modal visible, then animate in
      setIsModalVisible(true);
      Animated.spring(slideAnim, {
        toValue: Dimensions.get("window").height * 0.3, // Target position
        useNativeDriver: true,
        bounciness: 10,
      }).start();
    } else {
      // Animate out, then hide modal
      Animated.timing(slideAnim, {
        toValue: Dimensions.get("window").height, // Move below the screen
        duration: 300,
        easing: Easing.out(Easing.quad), // Fixed Easing import
        useNativeDriver: true,
      }).start(() => setIsModalVisible(false)); // Hide modal after animation
    }
  }, [visible]);

  if (!isModalVisible) return null; // Prevent Modal from rendering when hidden

  return (
    <Modal animationType="none" transparent={true} visible={isModalVisible}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      />
      <Animated.View
        style={[
          styles.modalContainer,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalMessage}>{message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.okButton} onPress={onOk}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    position: "absolute",
    left: width * 0.1,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#DC3545",
    paddingVertical: 12,
    marginRight: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  okButton: {
    flex: 1,
    backgroundColor: "#28A745",
    paddingVertical: 12,
    marginLeft: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomModal;

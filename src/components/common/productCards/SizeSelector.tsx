import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface SizeSelectorProps {
  sizes: string[]; // List of available sizes
  selectedSize: string; // Currently selected size
  onSizeSelect: (size: string) => void; // Function to handle size selection
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSizeSelect,
}) => {
  const allSizes = ["S", "M", "L", "XL"]; // List of all possible sizes

  // Check if a size is available or if "All" is selected
  const isSizeAvailable = (size: string) =>
    sizes.includes(size) || sizes.includes("All");

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Select Size:</Text> */}

      <View style={styles.sizeContainer}>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap",}}
        >
          {allSizes.map((size, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.sizeBox,
                selectedSize === size && styles.selectedBox,
                !isSizeAvailable(size) && styles.disabledBox, // Apply disabled style
              ]}
              onPress={() => isSizeAvailable(size) && onSizeSelect(size)} // Only select if size is available
              disabled={!isSizeAvailable(size)} // Disable size button if not available
            >
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && styles.selectedText,
                  !isSizeAvailable(size) && styles.disabledText, // Apply disabled text style
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sizeContainer: {
   display:'flex',
   flexDirection:'row',
   justifyContent:"flex-end",
   width:"100%"
  },
  sizeBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedBox: {
    backgroundColor: "#020003",
  },
  selectedText: {
    color: "#fff",
  },
  sizeText: {
    color: "#333",
    fontSize: 16,
  },
  disabledBox: {
    backgroundColor: "#e0e0e0", // Disabled box color
  },
  disabledText: {
    color: "#a0a0a0", // Disabled text color
  },
});

export default SizeSelector;

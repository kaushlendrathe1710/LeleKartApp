import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ShowMoreTextProps {
  text: string;
  wordLimit?: number; // Optional prop to customize word limit
  fontSize?: number; // Optional prop to customize font size
  lineHeight?: number; // Optional prop to customize line height
}

const ShowMoreText: React.FC<ShowMoreTextProps> = ({
  text,
  wordLimit = 30,
  fontSize = 16,
  lineHeight = 22,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Clean up text: trim extra spaces and replace multiple spaces with a single space
  const formattedText = text.replace(/\s+/g, " ").trim();

  const words = formattedText.split(" ");
  const displayedText = isExpanded
    ? formattedText
    : words.slice(0, wordLimit).join(" ");

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize, lineHeight }]}>
        {displayedText}
        {!isExpanded && words.length > wordLimit ? "..." : ""}
      </Text>

      {words.length > wordLimit && (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={[styles.showMore, { fontSize: fontSize * 0.85 }]}>
            {isExpanded ? "Show Less" : "Show More"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  text: {
    color: "#020003",
  },
  showMore: {
    color: "#007BFF",
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default ShowMoreText;

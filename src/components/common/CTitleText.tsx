// src/components/common/TitleText.tsx
import React from "react";
import { Text, StyleSheet } from "react-native";

interface TitleTextProps {
  text: string;
}

const TitleText: React.FC<TitleTextProps> = ({ text }) => {
  return <Text style={styles.contentText}>{text}</Text>;
};

const styles = StyleSheet.create({
  contentText: {
    marginTop: 5,
    marginBottom: 50,
    fontSize: 18,
    paddingTop: 20,
    fontWeight: "bold",
    color: "#444",
    textAlign: "center",
  },
});

export default TitleText;

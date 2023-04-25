import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Answer = ({ answer, onPress }) => {
  return (
    <TouchableOpacity style={styles.answerOptionButton} onPress={onPress}>
      <Text style={styles.answerText}>{answer}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  answerContainer: {
    backgroundColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  answerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  answerOptionButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#c4c4c4",
    padding: 20,
    marginVertical: 10,
  },
});

export default Answer;

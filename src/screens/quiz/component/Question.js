import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";

const Question = ({ question }) => {
  return (
    <SafeAreaView style={styles.questionContainer}>
      <ScrollView>
        <Text style={{ fontWeight: "bold",fontSize:25}}> {question}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  questionContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingTop: 20,
  },
});
export default Question;

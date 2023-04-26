import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";

export default function LoginVerification({ navigation }) {
  setTimeout(() => {
    navigation.replace("Landing");
  }, 6000);
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 40,
          fontWeight: "bold",
          fontStyle: "italic",
        }}
      >
        TechHack
      </Text>
      <Text style={{ color: "white", fontWeight: "600" }}>
        A mobile app to evaluate technical training.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "purple",
  },
});

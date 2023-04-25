import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const LandingScreen = ({ navigation }) => {
  const navigate = (page) => {
    navigation.navigate(page);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          navigate("python");
        }}
      >
        <Text style={{color: "white", fontWeight: "bold"}}>Python</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          navigate("c");
        }}
      >
        <Text style={{color: "white", fontWeight: "bold"}}>C</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          navigate("java");
        }}
      >
        <Text style={{color: "white", fontWeight: "bold"}}>Java</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    padding: "10%",
    alignSelf: "center",
    alignItems: "center",
  },
  Button: {
    justifyContent: "center",
    marginBottom: 20,
    alignItems: "center",
    backgroundColor:"#003166",
    padding: 10,
    width: windowWidth * 0.9,
    borderRadius: 10,
    height: windowHeight * 0.1,
  },
});
export default LandingScreen;

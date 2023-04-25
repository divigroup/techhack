import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function Level({ setLevel }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          setLevel("Easy");
        }}
      >
        <Text>Easy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          setLevel("Medium");
        }}
      >
        <Text>Medium</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          setLevel("Hard");
        }}
      >
        <Text>Hard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          setLevel("Expert");
        }}
      >
        <Text>Expert</Text>
      </TouchableOpacity>
    </View>
  );
}

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

    alignItems: "center",
    backgroundColor: "lightgreen",
    padding: 10,
    width: windowWidth * 0.9,
    marginBottom: 4,
    borderRadius: 10,
    height: windowHeight * 0.1,
  },
});

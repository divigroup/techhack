import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const LandingScreen = ({ navigation }) => {
  const [batch, setBatch] = useState([]);
  const Boiler = async () => {
    const batch = await AsyncStorage.getItem("batch");
    setBatch(batch);
  };

  useEffect(() => {
    Boiler();
  }, [navigation]);
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
        <Text>Python</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          navigate("c");
        }}
      >
        <Text>C</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          navigate("java");
        }}
      >
        <Text>Java</Text>
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

    alignItems: "center",
    backgroundColor: "lightgreen",
    padding: 10,
    width: windowWidth * 0.9,
    marginBottom: 4,
    borderRadius: 10,
    height: windowHeight * 0.1,
  },
});
export default LandingScreen;

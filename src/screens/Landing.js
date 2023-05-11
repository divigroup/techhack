import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-community/async-storage";
export default function Landing({ navigation }) {
  const Boiler = async () => {
    const email = await AsyncStorage.getItem("email");

    if (email) {
      navigation.replace("Message");
    }
  };

  useEffect(() => {
    Boiler();
  });
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require("../../assets/landingimage.jpg")}
          style={styles.image}
        ></Image>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.replace("Login");
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.replace("Signup");
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight * 3,
    backgroundColor: "#d9e8ff",
  },

  image: {
    width: 420,
    height: 450,
    resizeMode: "stretch",
  },
  button: {
    padding: 13,
    paddingHorizontal: 30,
    width: "60%",
    marginLeft: 88,
    marginTop: 20,
    backgroundColor: "purple",
    borderRadius: 20,
    marginBottom: 10,
  },
});

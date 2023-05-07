import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export default function LoginVerification({ navigation }) {
  const [navigatePage, setNavigate] = useState("");
  const onSubmitHandler = async (props) => {
    const email = await AsyncStorage.getItem("email");
    const password = await AsyncStorage.getItem("password");

    if (!email || !password) {
      setNavigate("Landing");
    }
    if (email && password) {
      fetch("http://192.168.1.36:3000/in/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (!data.result) {
            if (!data.emailError) {
              // navigation.replace("Landing");
              setNavigate("Landing");
            }
            if (!data.passwordError) {
              // navigation.replace("Landing");
              setNavigate("Landing");
            }
          } else {
            AsyncStorage.setItem("password", password);
            AsyncStorage.setItem("email", String(data["result"]["email"]));
            AsyncStorage.setItem("batch", String(data["result"]["batch"]));
            AsyncStorage.setItem(
              "firstname",
              String(data["result"]["firstName"])
            );
            AsyncStorage.setItem(
              "lastname",
              String(data["result"]["lastName"])
            );
            const Boiler = async () => {
              const email = await AsyncStorage.getItem("email");

              if (email) {
                setNavigate("Message");
                // navigation.replace("Message");
              }
            };
            Boiler();
          }
        });
    }
  };
  useEffect(() => {
    onSubmitHandler();
  }, []);
  setTimeout(() => {
    if (navigatePage.length != 0) {
      navigation.replace(navigatePage);
    }
  }, 1000);
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

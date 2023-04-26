import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export default function Profile() {
  const [batch, setBatch] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const Boiler = async () => {
    const batch = await AsyncStorage.getItem("batch");
    const firstname = await AsyncStorage.getItem("firstname");
    const lastname = await AsyncStorage.getItem("lastname");
    const name = firstname + " " + lastname;
    const email = await AsyncStorage.getItem("email");

    setBatch(batch);
    setName(name);
    setEmail(email);
  };

  useEffect(() => {
    Boiler();
  });
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Profile</Text>
        <Text>Email : {email}</Text>
        <Text>Name : {name}</Text>
        <Text>Batch : {batch}</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
});

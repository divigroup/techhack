
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { TextInput } from "react-native-gesture-handler";

export default function ForgotPassword() {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <View
          style={{
            alignItems: "center",
            paddingVertical: 10,
            gap: 1,
          }}
        >
          <Text
            style={{
              color: "#d3d3d3",
              fontSize: 80,
              fontWeight: "bold",
              marginBottom: 80,
            }}
          >
            Forgot password
          </Text>
          <Text>Enter email address</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            // onChangeText={setEmail}
          ></TextInput>
          <Text
            style={{ color: "#000000", marginBottom: 5 }}
            // onPress={() => navigation.navigate("Login")}
          >
            Back to sign in
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setError(""), onSubmitHandler();
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Send</Text>
          </TouchableOpacity>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight * 3,
    backgroundColor: "white",
  },
  scrollView: {
    backgroundColor: "white",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 100,
  },
  input: {
    color: "#000000",
    padding: 10,
    marginVertical: 2,
    width: "90%",
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "stretch",
    borderColor: "#000000",
  },
  button: {
    padding: 13,
    paddingHorizontal: 30,
    marginTop: 10,
    width: "50%",
    color: "white",
    backgroundColor: "#1167b1",
    borderRadius: 40,
    marginBottom: 10,
  },
});
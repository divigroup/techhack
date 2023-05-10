import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { server } from "../utils/credentials";

export default function Afterotp({ route, navigation }) {
  useEffect(() => {
    if (success) {
      navigation.replace("verification");
    }
  });
  const { email } = route.params;
  const [password, setPassword] = useState("");
  const [success, setsuccess] = useState(false);
  const onSubmitHandler = async (props) => {
    if (password.length < 1) {
      Alert.alert("password less then 9");
    } else {
      fetch(`${server + "resetpassword"} `, {
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
          if (data.result === "password updated") {
            Alert.alert(
              "Password Status",
              "Password Successfully updated",
              [
                {
                  text: "OK",
                  onPress: () => {
                    setsuccess(true);
                  },
                },
              ],
              { cancelable: false }
            );
          }
        });
    }
  };
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
              fontSize: 40,
              fontWeight: "bold",
              marginBottom: 80,
            }}
          >
            Reset Password
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
          ></TextInput>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onSubmitHandler();
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Submit</Text>
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
    fontSize: 20,
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

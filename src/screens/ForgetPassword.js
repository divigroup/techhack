import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  server,
  service_id,
  template_id,
  public_key,
} from "../utils/credentials";
export default function ForgetPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorflag, setErrorflag] = useState(false);
  const [success, setSuccess] = useState(false);
  const onSubmitHandler = async (props) => {
    if (email.length == 0) {
      setError("All field Required");
      setErrorflag(true);
    } else {
      await fetch(`${server + "checkuser"} `, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result === "user doesn't exist.") {
            setErrorflag(true);
            setError("user doesn't exist.");
          } else {
            let otpVal = Math.floor(1000 + Math.random() * 9000);
            let templateParams = {
              to_email: `${email}`,
              message: `${otpVal}`,
            };
            emailjs
              .send(service_id, template_id, templateParams, public_key)
              .then(
                function (response) {
                  if (response.status == 200) {
                    navigation.navigate("passwordreset", {
                      otp: otpVal,
                      email: email,
                    });
                  }
                },
                function (error) {
                  setErrorflag(true);
                  setError("Try again");
                }
              );
            navigation.navigate("passwordreset", {
              otp: otpVal,
              email: email,
            });
          }
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentcontainer}>
        <Text style={styles.text}>Forget Password?</Text>
        {errorflag ? <Text style={{ color: "red" }}>{error}</Text> : <></>}
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={setEmail}
        ></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setError(""), onSubmitHandler();
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    width: "100%",
  },
  contentcontainer: {
    paddingTop: StatusBar.currentHeight * 3,
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
  },
  input: {
    color: "#000000",
    padding: 10,
    marginVertical: 2,
    width: "90%",
    marginLeft: "5%",

    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "stretch",
    borderColor: "#000000",
  },
  text: {
    alignSelf: "center",
    marginBottom: "5%",
  },
  button: {
    padding: 13,
    paddingHorizontal: 30,
    marginTop: 10,
    width: "50%",
    color: "white",
    alignSelf: "center",
    backgroundColor: "#1167b1",
    borderRadius: 40,
    marginBottom: 10,
  },
});

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
import { CourierClient } from "@trycourier/courier";
import {
  server,
  service_id,
  template_id,
  public_key,
} from "../utils/Credentials";
import { authorizationToken } from "../utils/Credentials";
export default function ForgetPassword({ navigation }) {
  const courier = CourierClient({
    authorizationToken: authorizationToken,
  });
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorflag, setErrorflag] = useState(false);
  const [success, setSuccess] = useState(false);
  const onSubmitHandler = async (props) => {
    if (email.length == 0) {
      setError("All fields Required");
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
        .then(async (data) => {
          if (data.result === "user doesn't exist.") {
            setErrorflag(true);
            setError("user doesn't exist.");
          } else {
            let otpVal = Math.floor(1000 + Math.random() * 9000);
            // let templateParams = {
            //   to_email: `${email}`,
            //   message: `${otpVal}`,
            // };
            // emailjs
            //   .send(service_id, template_id, templateParams, public_key)
            //   .then(
            //     function (response) {
            //       if (response.status == 200) {
            //         navigation.navigate("passwordreset", {
            //           otp: otpVal,
            //           email: email,
            //         });
            //       }
            //     },
            //     function (error) {
            //       setErrorflag(true);
            //       setError("Try again");
            //     }
            //   );
            // navigation.navigate("passwordreset", {
            //   otp: otpVal,
            //   email: email,
            // });
            /*
      1) Install Courier SDK: npm install @trycourier/courier
      2) Make sure you allow ES module imports: Add "type": "module" to package.json file
      */

            const { requestId } = await courier.send({
              message: {
                content: {
                  title: "Welcome to TechHack!",
                  body: "Your otp for password reset? {{otp}}",
                },
                data: {
                  otp: otpVal,
                },
                to: {
                  email: email,
                },
              },
            });
            if (requestId) {
              navigation.navigate("passwordreset", {
                otp: otpVal,
                email: email,
              });
            } else {
              setErrorflag(true);
              setError("Try again");
            }
          }
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentcontainer}>
        <Text
          style={{
            color: "black",
            fontSize: 40,
            fontWeight: "bold",
            marginBottom: 80,
            marginTop: -70,
            marginLeft: 100,
          }}
        >
          TechHack
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 20,
            marginLeft: 100,
          }}
        >
          Forgot Password?
        </Text>
        {errorflag ? (
          <Text style={{ color: "red", marginLeft: 25 }}>{error}</Text>
        ) : (
          <></>
        )}
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
        <Text
          style={{
            color: "#000000",
            marginBottom: 5,
            marginLeft: 160,
            marginTop: 20,
          }}
          onPress={() => navigation.navigate("Login")}
        >
          Back to{" "}
          <Text style={{ color: "purple", fontWeight: "bold" }}>Sign in</Text>
        </Text>
        <Text style={{ marginLeft: 120 }}>
          Don't have an account?{" "}
          <Text
            style={{ color: "purple", fontWeight: "bold" }}
            onPress={() => navigation.navigate("Signup")}
          >
            Signup
          </Text>
        </Text>
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
    paddingTop: StatusBar.currentHeight * 0.2,
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
  },

  input: {
    color: "#000000",
    padding: 10,
    marginVertical: 2,
    width: "90%",
    height: "16%",
    marginLeft: "5%",

    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 2,
    alignItems: "stretch",
    borderColor: "#d3d3d3",
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
    backgroundColor: "purple",
    borderRadius: 15,
    marginBottom: 10,
  },
});

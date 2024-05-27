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
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-community/async-storage";
import { server } from "../utils/Credentials";
export default function Login({ navigation }) {
  const [clicked, setclicked] = useState(false);
  const Boiler = async () => {
    const email = await AsyncStorage.getItem("email");

    if (email) {
      navigation.replace("Message");
    }
  };

  useEffect(() => {
    Boiler();
  });
  const onSubmitHandler = async (props) => {
    if (email.length === 0 || password.length === 0) {
      setError("All field are mandatory");
      setErrorflag(true);
      setclicked(false);
    } else {
      // console.log("entered");
      fetch(`${server + "login"} `, {
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
              setError(data.passwordError);
              setErrorflag(true);
              setclicked(false);
            }
            if (!data.passwordError) {
              setError(data.emailError);
              setErrorflag(true);
              setclicked(false);
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
                navigation.replace("Message");
              }
            };
            Boiler();
          }
        });
    }
  };

  const [error, setError] = useState("");
  const [errorflag, setErrorflag] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View
          style={{
            alignItems: "center",
            paddingVertical: 30,
            gap: 1,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 40,
              fontWeight: "bold",
              marginBottom: 80,
            }}
          >
            TechHack
          </Text>
          <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>
            Sign in
          </Text>
          {/* <Image
            source={require("../../assets/favicon.png")}
            style={styles.image}
          ></Image> */}
          {errorflag ? <Text style={{ color: "red" }}>{error}</Text> : <></>}
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
          ></TextInput>
          {clicked ? <ActivityIndicator size="large" /> : <></>}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setclicked(true), setError(""), onSubmitHandler();
            }}
            disabled={clicked}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Sign In</Text>
          </TouchableOpacity>
          <Text
            style={{ color: "#000000", marginBottom: 4 }}
            onPress={() => navigation.navigate("forgotpassword")}
          >
            Forgot Password?
          </Text>
          <Text style={{ fontSize: 15 }}>
            Don't have a account?{" "}
            <Text
              style={{ color: "purple", fontWeight: "bold" }}
              onPress={() => navigation.navigate("Signup")}
            >
              Signup
            </Text>
          </Text>
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
    height: "100%",
  },

  text: {
    fontSize: 42,
  },
  // image: {
  //   width: 110,
  //   height: 110,
  //   marginBottom: 100,
  // },
  input: {
    color: "#000000",
    padding: 10,
    marginVertical: 2,
    width: "90%",
    height: "13%",
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "stretch",
    borderColor: "#d3d3d3",
  },
  button: {
    padding: 13,
    paddingHorizontal: 30,
    marginTop: 10,
    width: "50%",
    color: "white",
    backgroundColor: "purple",
    borderRadius: 15,
    marginBottom: 10,
  },
});

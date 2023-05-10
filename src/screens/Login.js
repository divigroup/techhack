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
import AsyncStorage from "@react-native-community/async-storage";
import { server } from "../utils/credentials";
export default function Login({ navigation }) {
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
    } else {
      console.log("entered");
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
            }
            if (!data.passwordError) {
              setError(data.emailError);
              setErrorflag(true);
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
            Sign In
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setError(""), onSubmitHandler();
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Sign In</Text>
          </TouchableOpacity>
          <Text
            style={{ color: "#000000", marginBottom: 5 }}
            onPress={() => navigation.navigate("forgotpassword")}
          >
            Forgot Password?
          </Text>
          <Text>
            Don't have a account?{" "}
            <Text
              style={{ color: "#1167b1" }}
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

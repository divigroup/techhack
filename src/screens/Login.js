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
// import { imag } from "../../assets/favicon.png";
export default function Login({ navigation }) {
  const Boiler = async () => {
    const email = await AsyncStorage.getItem("email");

    if (email) {
      navigation.replace("Message");
    } else {
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    Boiler();
  }, [errorflag]);
  const onSubmitHandler = async (props) => {
    if (email.length === 0 || password.length === 0) {
      setError("All field are mandatory");
      setErrorflag(true);
    } else {
      console.log("entered");
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
              setError(data.passwordError);
              setErrorflag(true);
            }
            if (!data.passwordError) {
              setError(data.emailError);
              setErrorflag(true);
            }
          } else {
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
          <Image
            source={require("../../assets/favicon.png")}
            style={styles.image}
          ></Image>
          {errorflag ? <Text style={{ color: "red" }}>{error}</Text> : <></>}
          <TextInput
            style={styles.input}
            placeholder="Email/Phone"
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
              setError(""), onSubmitHandler(), Boiler();
            }}
          >
            <Text>SignIn</Text>
          </TouchableOpacity>
          <Text>
            Don't have a account?{" "}
            <Text
              style={{ color: "blue" }}
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
  },
  scrollView: {
    backgroundColor: "pink",
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
    padding: 10,
    marginVertical: 2,
    width: "90%",
    borderColor: "black",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  button: {
    padding: 13,
    paddingHorizontal: 30,
    marginTop: 10,
    backgroundColor: "grey",
    borderRadius: 20,
    marginBottom: 10,
  },
});

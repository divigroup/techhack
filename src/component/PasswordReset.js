import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

export default function PasswordReset({ route, navigation }) {
  const { otp } = route.params;
  const { email } = route.params;
  const [error, setError] = useState("");
  // console.log(otp, "otp");
  const [errorflag, setErrorflag] = useState(true);
  // console.log(email);
  const [i1, seti1] = useState(0);
  const [i2, seti2] = useState(0);
  const [i3, seti3] = useState(0);
  const [i4, seti4] = useState(0);

  const onSubmitHandler = async (props) => {
    if (i1 === " " || i2 === " " || i3 === " " || i4 === " ") {
      setError("All fiels required");
      setErrorflag(true);
    } else {
      let otpwritten = String(i1) + String(i2) + String(i3) + String(i4);
      if (otpwritten === String(otp)) {
        navigation.navigate("afterotp", { email: email });
      } else {
        // console.log("bhag");
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: "center",
          paddingVertical: 10,
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
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Sign in</Text>
        {errorflag ? <Text style={{ color: "red" }}>{error}</Text> : <></>}
      </View>
      <View style={styles.contentcontainer}>
        <TextInput
          style={styles.input}
          maxLength={1}
          placeholder="X"
          keyboardType="numeric"
          onChangeText={seti1}
        ></TextInput>
        <TextInput
          style={styles.input}
          maxLength={1}
          placeholder="X"
          keyboardType="numeric"
          onChangeText={seti2}
        ></TextInput>
        <TextInput
          style={styles.input}
          maxLength={1}
          placeholder="X"
          keyboardType="numeric"
          onChangeText={seti3}
        ></TextInput>
        <TextInput
          style={styles.input}
          maxLength={1}
          placeholder="X"
          keyboardType="numeric"
          onChangeText={seti4}
        ></TextInput>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setError("");
          onSubmitHandler();
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Send OTP</Text>
      </TouchableOpacity>
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
    flexDirection: "row",
    paddingTop: StatusBar.currentHeight * 1,
    alignSelf: "center",
    justifyContent: "center",

    alignContent: "center",
    width: "100%",
  },
  input: {
    color: "#000000",
    marginLeft: 10,
    padding: 10,
    marginVertical: 2,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#d3d3d3",
    borderRadius: 10,
    marginBottom: 15,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "white",
  },
  text: {
    alignSelf: "center",
    marginBottom: "5%",
  },
  button: {
    padding: 13,
    paddingHorizontal: 30,
    marginTop: 15,
    marginLeft: 10,
    width: "50%",
    color: "white",
    alignSelf: "center",
    backgroundColor: "purple",
    borderRadius: 15,
    marginBottom: 10,
  },
});

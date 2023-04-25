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
import { useState } from "react";
import Dialog, { DialogContent } from "react-native-popup-dialog";
import { TextInput } from "react-native-gesture-handler";

const API_URL =
  Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";

// import { imag } from "../../assets/favicon.png";
export default function Signup({ navigation }) {
  const [allfielderror, setAllfielderror] = useState(false);
  const onSubmitHandler = () => {
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      password.length === 0
    ) {
      setError("All field Required");
      setAllfielderror(true);
    } else {
      setAllfielderror(false);

      const payload = {
        firstName,
        lastName,
        email,
        password,
      };
      fetch("http://192.168.1.36:5000/in/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(async (res) => {
          try {
            const jsonRes = await res.json();
            if (res.status !== 200) {
              console.log("repeat");
            } else {
              setdialog(true);
            }
          } catch (err) {
            if (res.status === 422) {
              setError("Email already registered");
            } else {
              setError("Sorry, Server Error Try Again in a while");
            }

            setAllfielderror(true);
          }
        })
        .catch((err) => {
          setError("Sorry, Server Error Try Again in a while");
          setAllfielderror(true);
        });
    }
  };

  const [showPassword, setShowPassword] = useState(true);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dialog, setdialog] = useState(false);
  const [error, setError] = useState("");
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
          <Dialog
            visible={dialog}
            onTouchOutside={() => {
              setdialog(false);
            }}
          >
            <View style={{ padding: 10 }}>
              <DialogContent
                style={{ width: "100%", padding: 4, alignItems: "center" }}
              >
                <Text style={{ fontSize: 30 }}>Registration success</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setdialog(false);
                  }}
                >
                  <Text>Ok</Text>
                </TouchableOpacity>
              </DialogContent>
            </View>
          </Dialog>

          <Image
            source={require("../../assets/favicon.png")}
            style={styles.image}
          ></Image>

          {allfielderror ? (
            <Text style={{ color: "red" }}>{error}</Text>
          ) : (
            <></>
          )}
          <View style={{ flexDirection: "row", width: "88%", columnGap: 4 }}>
            <TextInput
              style={styles.smallinput}
              placeholder="First Name"
              onChangeText={setfirstName}
            />
            <TextInput
              style={styles.smallinput}
              placeholder="Last Name"
              onChangeText={setlastName}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
          />
          <View style={styles.passworddiv}>
            <TextInput
              style={styles.password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={showPassword}
            />
            {showPassword ? (
              <Image
                style={{ width: "10%", height: "90%" }}
                source={require("../../assets/view.png")}
                onPress={() => {
                  setShowPassword(false);
                }}
              ></Image>
            ) : (
              <Image
                style={{ width: "10%", height: "90%" }}
                source={require("../../assets/hide.png")}
                onPress={() => {
                  setShowPassword(true);
                }}
              />
            )}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setError(""), onSubmitHandler();
            }}
          >
            <Text>Register</Text>
          </TouchableOpacity>
          <Text>
            Have a account?
            <Text
              style={{ color: "blue" }}
              onPress={() => navigation.navigate("Login")}
            >
              Login
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
  passworddiv: {
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "white",
    padding: 10,
    marginVertical: 2,

    borderColor: "black",
    alignItems: "center",

    borderRadius: 10,
  },

  password: {
    width: "80%",
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
  smallinput: {
    padding: 10,
    marginVertical: 2,
    width: "50%",
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

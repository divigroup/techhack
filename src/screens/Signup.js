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
  Modal,
  Dimensions,
  Alert,
  ActivityIndicator 
} from "react-native";
import { useState } from "react";
import Dialog, { DialogContent } from "react-native-popup-dialog";
import { TextInput } from "react-native-gesture-handler";
import { server } from "../utils/credentials";
import { authorizationToken } from "../utils/credentials";
import { CourierClient } from "@trycourier/courier";



export default function Signup({ navigation }) {
  const courier = CourierClient({
    authorizationToken: authorizationToken,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allfielderror, setAllfielderror] = useState(false);
  const [receivedotp, setReceivedotp] = useState("");
  const [sentotp, setsentotp] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading,setloading]=useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const onSubmitHandler = async () => {
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
      let otpVal = Math.floor(1000 + Math.random() * 9000);
      setsentotp(String(otpVal));
      const { requestId } = await courier.send({
        message: {
          content: {
            title: "Welcome to TechHack!",
            body: "Your otp for Account setup? {{otp}}",
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
        setIsModalVisible(true);
      } else {
        // setErrorflag(true);
        setAllfielderror(true);
        setError("Try again");
      }
    }
  };
  const handleOtpSubmit = () => {
    // Do something with the password, e.g. validate it
    // console.log("Submitting password:", password);
    // Hide the modal
   
  
    if (sentotp == receivedotp) {
      setloading(true)
      const payload = {
        firstName,
        lastName,
        email,
        password,
      };
      fetch(`${server + "signup"} `, {
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
              setloading(false)
              setdialog(true);
            }
          } catch (err) {
            if (res.status === 422) {
              setloading(false)
              setError("Email already registered");
            } else {
              setloading(false)
              setError("Sorry, Server Error Try Again in a while");
            }
            setAllfielderror(true);
          }
        })
        .catch((err) => {
          setError("Sorry, Server Error Try Again in a while");
          setAllfielderror(true);
        });
      setIsModalVisible(false);
    } else {
      Alert.alert("Try again");
    }
  };
  const handleChangeText = (text) => {
    // Ensure the password only contains 4 digits
    setReceivedotp(String(text));
 
  };

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
          
            paddingBottom:30,
            gap: 1,
          }}
        >
          <Modal visible={isModalVisible} animationType="slide">
            <View style={styles.modalContent}>
              <Text style={styles.modalLabel}>Enter 4-digit Otp:</Text>
              {/* <View style={styles.inputContainer}> */}
              <TextInput
                style={styles.inputotp}
                keyboardType="numeric"
                maxLength={4}
                // secureTextEntry={true}
                onChangeText={(text) => handleChangeText(text)}
              />
              {/* </View> */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={styles.modelbutton}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleOtpSubmit()}
                  style={styles.modelbutton}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Dialog
            visible={dialog }
            onTouchOutside={() => {
              setdialog(false);
            }}
          >
            <View style={{ padding: 10 }}>
              {!loading?
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
              </DialogContent>:<DialogContent
                style={{ width: "100%", padding: 4, alignItems: "center" }}
              >
                <Text style={{ fontSize: 30 }}>Registration in progress</Text>
             <ActivityIndicator size="large" />
              </DialogContent>}
            </View>
          </Dialog>
          <Dialog
            visible={loading}
            
          >
            <View style={{ padding: 10 }}>
             <DialogContent
                style={{ width: "100%", padding: 4, alignItems: "center" }}
              >
                <Text style={{ fontSize: 30 }}>Registration in progress</Text>
             <ActivityIndicator size="large" />
              </DialogContent>
            </View>
          </Dialog>
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
            Sign up
          </Text>

          {allfielderror ? (
            <Text style={{ color: "red" }}>{error}</Text>
          ) : (
            <></>
          )}
          <View style={{ flexDirection: "row", width: "90%", columnGap: 4 }}>
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
        
          <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        secureTextEntry={isPasswordVisible}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
        {!isPasswordVisible ? (
          <Image source={require('../../assets/view.png')} style={{ width: 24, height: 24 }} />
        ) : (
          <Image source={require('../../assets/hide.png')} style={{ width: 24, height: 24 }} />
        )}
      </TouchableOpacity>
    </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setError(""), onSubmitHandler();
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Register
            </Text>
          </TouchableOpacity>
          <View style={{zIndex:100}}>
          <Text  style={{}}>
            Have an account?{" "}
            <Text
              style={{ color: "purple", fontWeight: "bold"}}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
          </View>
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
    height: "100%", 
  },
  scrollView: {
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
    marginLeft: -2,
    width: "91%",
    height: "12%",
    borderWidth: 2,
    borderColor: "#d3d3d3",
    marginTop: 10,
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
  },
  smallinput: {
    padding: 10,
    marginVertical: 2,
    marginLeft: -4,
    marginRight: 5,
    width: "50%",
    height: "82%",
    borderWidth: 2,
    borderColor: "#d3d3d3",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 15,
  },
  button: {
    padding: 13,
    paddingHorizontal: 30,
    marginTop: 10,
    width: "50%",
    backgroundColor: "purple",
    borderRadius: 15,
    marginBottom: 10,
  },
  modelbutton: {
    padding: 13,
    paddingHorizontal: 30,
    marginTop: 10,

    backgroundColor: "purple",
    borderRadius: 15,
    marginBottom: 10,
  },

  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    width: "90%",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 20,
  },
  inputotp: {
    width: "80%",
    height: 50,
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
   inputContainer: {
 padding: 10,
    marginVertical: 2,
    marginLeft: -2,
    width: "91%",
    height: "12%",
    borderWidth: 2,
    borderColor: "#d3d3d3",
    marginTop: 10,
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,

    flexDirection: 'row',
    alignItems: 'center',
   
   
    padding: 10,
   
  },
  textInput: {
    flex: 1,
    height: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
});

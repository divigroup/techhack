import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { useEffect, useState } from "react";
export default function LeftheaderItems({ navigation }) {
  const [email, setEmail] = useState("");
  const [click, setClick] = useState(0);
  const LogOut = async () => {
    try {
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("batch");
      await AsyncStorage.removeItem("firstname");
      await AsyncStorage.removeItem("lastname");
    } catch (e) {
      console.log("logout failure");
    }
  };
  const Boiler = async () => {
    const email = await AsyncStorage.getItem("email");

    if (!email) {
      navigation.replace("verification");
    } else {
      setEmail(email);
    }
  };

  useEffect(() => {
    Boiler();
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,

        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View>
        <View style={{ alignItems: "center", padding: 10 }}>
          <Image
            source={require("../../assets/profile.jpg")}
            style={{
              borderRadius: 90,
              resizeMode: "contain",
              width: "60%",
              height: 120,
              maxWidth: 120,
            }}
          ></Image>
          <Text style={{ fontWeight: "bold" }}>{email}</Text>
        </View>
        <View
          style={{
            width: "100%",
            height: 50,

            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("profile");
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              LogOut(), setClick(1);
            }}
          >
            <Text style={{ fontSize: 32, fontWeight: "bold",paddingLeft:90}}>
              Logout-{String(">")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#b24bf3",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute", //Here is the trick
          bottom: 0, //Here is the trick
        }}
      >
        <Text>@2023</Text>
      </View>
    </SafeAreaView>
  );
}

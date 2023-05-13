import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";

import React, { useEffect, useState } from "react";
import gif from "../../../../assets/6ob.gif";
import AsyncStorage from "@react-native-community/async-storage";
import { sub } from "react-native-reanimated";
import { server } from "../../../utils/credentials";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
export default function Analysis({ subject, Score, Totalquestion, level }) {
  // const [batch, setBatch] = useState("");
  const percentage = (Score / Totalquestion) * 100;
  const [updatesuccess, setUpdatesuccess] = useState(false);

  const sublevel = subject + level;
  // console.log(sublevel);
  const Boiler = async () => {
    const batch = await AsyncStorage.getItem("batch");
    const email = await AsyncStorage.getItem("email");
    let batchArray = [];
    if (batch) {
      batchArray = batch.split(",");
    }

    let update = true;
    for (let i = 0; i < batchArray.length; i++) {
      if (batchArray[i] == sublevel) {
        update = false;
      }
    }
    if (update && percentage >= 60) {
      if (batch) {
        AsyncStorage.setItem("batch", batch + "," + sublevel);
      } else {
        AsyncStorage.setItem("batch", sublevel);
      }

      batchArray.push(sublevel);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        email: email,
        batch: batchArray,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      // let link = server + "updatebatch";
      fetch(`${server + "updatebatch"} `, requestOptions)
        .then((response) => response.text())
        .then((result) => setUpdatesuccess(result.result === "updated"))
        .catch((error) => console.log("error", error));
    }
  };

  useEffect(() => {
    Boiler();
  });

  if (percentage < 60) {
    return (
      <View style={styles.container}>
        {/* <ImageBackground source={gif} resizeMode="stretch" style={styles.img}> */}
          <Text style={{fontSize: 30,fontWeight:"bold"}}>You Score is less than 60%</Text>

          <Text style={{fontSize: 30,fontWeight:"bold"}}>Level: {level}</Text>
        {/* </ImageBackground> */}
      </View>
    );
  } else {
    // AsyncStorage.setItem("batch", String());
    let image =
      "https://techhackbadgesbucket.s3.ap-south-1.amazonaws.com/badges/" +
      subject +
      level +
      ".png";

    return (
      <View style={styles.container}>
        <ImageBackground source={gif} resizeMode="stretch" style={styles.img}>
          <Text
            style={{ fontSize: 40, fontWeight: "800",marginBottom:40}}
          >
            Congratulations!{" "}
          </Text>
          <Text style={{fontSize: 30,fontWeight:"bold"}}>You earned a new Badge</Text>

          {/* <Text>Score :{Score}</Text>
          <Text>Totalquestion: {Totalquestion}</Text>
          <Text>Level:{level}</Text>
          <Text>subject :{subject}</Text> */}
          <Image
            source={{ uri: image }}
            style={{ height: 150, width: 150 }}
          ></Image>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  petalsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  img: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  petal: {
    position: "absolute",
    width: 50,
    height: 50,
    tintColor: "#FFC0CB",
  },
  congratsText: {
    fontSize: 64,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  messageText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 50,
  },
});

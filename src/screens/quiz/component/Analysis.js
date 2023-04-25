import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";

import React, { useEffect, useRef } from "react";
import gif from "../../../../assets/6ob.gif";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
export default function Analysis({ subject, Score, Totalquestion, level }) {
  const percentage = (Score / Totalquestion) * 100;
  if (percentage < 60) {
    return (
      <View style={styles.container}>
        <ImageBackground source={gif} resizeMode="stretch" style={styles.img}>
          <Text>You Score is less than 60%</Text>

          <Text>Level:{level}</Text>
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground source={gif} resizeMode="stretch" style={styles.img}>
          <Text>Congratulation On finishing the quiz</Text>
          <Text>Score :{Score}</Text>
          <Text>Totalquestion: {Totalquestion}</Text>
          <Text>Level:{level}</Text>
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

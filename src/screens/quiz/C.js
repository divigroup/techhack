import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar
} from "react-native";
import Quiztemp from "./component/Quiztemp";
import AsyncStorage from "@react-native-community/async-storage";
import backimage from "../../../assets/back.png";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const C = ({ route, navigation }) => {
  const [lastLevel, setLastlevel] = useState(-1);
  const Boiler = async () => {
    const batch = await AsyncStorage.getItem("batch");

    const batchArray = batch.split(",");

    for (let i = 0; i < batchArray.length; i++) {
      if (batchArray[i] === "cexpert") {
        setLastlevel(3);
      } else if (batchArray[i] === "chard") {
        setLastlevel(2);
      } else if (batchArray[i] === "cmedium") {
        setLastlevel(1);
      } else if (batchArray[i] === "ceasy") {
        setLastlevel(0);
      }
    }
  };

  useEffect(() => {
    Boiler();
  }, [navigation]);
  const [level, setLevel] = useState("");
  if (level === "") {
    return (
      <View style={styles.container}>
        <View style={{ }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.navigate("Message");
            }}
          >
            <Image
              source={backimage}
              style={{
                height: StatusBar.currentHeight + 5,
                // width: StatusBar.currentHeight * 2,
                maxWidth: 30,
                maxHeight: 30,
                marginTop:-135,
                marginLeft:-180
              }}
            ></Image>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 50, marginBottom: 30 }}>
            C
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 30, marginBottom: 25 }}>
            LEVELS
          </Text>
        </View>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            setLevel("easy");
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 30 }}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={lastLevel >= 0 ? styles.Button : styles.disabledbutton}
          onPress={() => {
            if (lastLevel >= 0) {
              setLevel("medium");
            }
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 30 }}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={lastLevel >= 1 ? styles.Button : styles.disabledbutton}
          onPress={() => {
            if (lastLevel >= 1) {
              setLevel("hard");
            }
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 30 }}>Hard</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <Quiztemp
        level={level}
        subject="c"
        questions={questions}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      />
    );
  }
};

const styles = StyleSheet.create({
  backButton: {
    paddingTop: StatusBar.currentHeight,
    // backgroundColor: "#fff",
    paddingLeft: 6,

    width: StatusBar.currentHeight * 2,
    maxWidth: 41,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: "10%",
    alignSelf: "center",
    alignItems: "center",
  },
  Button: {
    justifyContent: "center",

    alignItems: "center",
    backgroundColor: "#b24bf3",
    padding: 10,
    width: windowWidth * 0.9,
    marginBottom: 4,
    borderRadius: 10,
    height: windowHeight * 0.15,
  },
  disabledbutton: {
    justifyContent: "center",

    alignItems: "center",
    backgroundColor: "gray",
    padding: 10,
    width: windowWidth * 0.9,
    marginBottom: 4,
    borderRadius: 10,
    height: windowHeight * 0.15,
  },
});
export default C;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Quiztemp from "./component/Quiztemp";
import AsyncStorage from "@react-native-community/async-storage";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const C = ({ route, navigation }) => {
  const [lastLevel, setLastlevel] = useState(-1);
  const Boiler = async () => {
    const batch = await AsyncStorage.getItem("batch");
    let batchArray = [];

    if (batch) {
      console.log(batch);
      batchArray = batch.split(",");
    }

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

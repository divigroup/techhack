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
import AsyncStorage from "@react-native-community/async-storage";
import backimage from "../../../assets/back.png";

import Quiztemp from "./component/Quiztemp";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const questions = [
  {
    question: "What is Java?",
    answers: [
      "A. A high-level programming language",
      "B. A low-level programming language",
      "C. A markup language",
      "D. A scripting language",
    ],
    correctAnswer: "A. A high-level programming language",
  },
  {
    question: "What is the syntax to print 'Hello, World!' in Java?",
    answers: [
      "A. console.log('Hello, World!');",
      "B. System.out.println('Hello, World!');",
      "C. print('Hello, World!');",
      "D. echo 'Hello, World!';",
    ],
    correctAnswer: "B. System.out.println('Hello, World!');",
  },
  {
    question: "Which symbol is used for single line comments in Java?",
    answers: ["A. //", "B. /*...*/", "C. #", "D. !--...--"],
    correctAnswer: "A. //",
  },
  {
    question: "Which symbol is used for multi-line comments in Java?",
    answers: ["A. //", "B. /*...*/", "C. #", "D. !--...--"],
    correctAnswer: "B. /*...*/",
  },
  {
    question:
      "What is the output of this code: System.out.println(2 + 3 * 4);?",
    answers: ["A. 14", "B. 20", "C. 24", "D. 32"],
    correctAnswer: "B. 20",
  },
  {
    question:
      "Which data type is used to represent a sequence of characters in Java?",
    answers: ["A. int", "B. float", "C. bool", "D. String"],
    correctAnswer: "D. String",
  },
  {
    question: "Which data type is used to represent a list of values in Java?",
    answers: ["A. int", "B. float", "C. bool", "D. Array"],
    correctAnswer: "D. Array",
  },
  {
    question: "Which keyword is used to define a function in Java?",
    answers: ["A. function", "B. define", "C. def", "D. public"],
    correctAnswer: "D. public",
  },
  {
    question:
      "What is the output of this code: System.out.println('hello' + 'world');?",
    answers: [
      "A. hello+world",
      "B. hello world",
      "C. helloworld",
      "D. SyntaxError",
    ],
    correctAnswer: "C. helloworld",
  },
  {
    question:
      "What is the output of this code: System.out.println('hello' * 3);?",
    answers: [
      "A. hellohellohello",
      "B. hello 3",
      "C. hellohello",
      "D. SyntaxError",
    ],
    correctAnswer: "D. SyntaxError",
  },
];
const Java = ({ route, navigation }) => {
  const [lastLevel, setLastlevel] = useState(-1);
  const Boiler = async () => {
    const batch = await AsyncStorage.getItem("batch");
    let batchArray = [];

    if (batch) {
      console.log(batch);
      batchArray = batch.split(",");
    }

    for (let i = 0; i < batchArray.length; i++) {
      if (batchArray[i] === "javaexpert") {
        setLastlevel(3);
      } else if (batchArray[i] === "javahard") {
        setLastlevel(2);
      } else if (batchArray[i] === "javamedium") {
        setLastlevel(1);
      } else if (batchArray[i] === "javaeasy") {
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
            Java
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
        subject="java"
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
export default Java;

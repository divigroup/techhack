import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Quiztemp from "./component/Quiztemp";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const questions = [
  {
    question: "What is Python?",
    answers: [
      "A. A high-level programming language",
      "B. A low-level programming language",
      "C. A markup language",
      "D. A scripting language",
    ],
    correctAnswer: "A. A high-level programming language",
  },
  {
    question: "What is the syntax to print 'Hello, World!' in Python?",
    answers: [
      "A. console.log('Hello, World!');",
      "B. print('Hello, World!')",
      "C. System.out.println('Hello, World!');",
      "D. echo 'Hello, World!';",
    ],
    correctAnswer: "B. print('Hello, World!')",
  },
  {
    question: "Which symbol is used for single line comments in Python?",
    answers: ["A. //", "B. /*...*/", "C. #", "D. !--...--"],
    correctAnswer: "C. #",
  },
  {
    question: "Which symbol is used for multi-line comments in Python?",
    answers: ["A. //", "B. /*...*/", "C. #", "D. !--...--"],
    correctAnswer: "B. /*...*/",
  },
  {
    question: "What is the output of this code: print(2 + 3 * 4)?",
    answers: ["A. 14", "B. 20", "C. 24", "D. 32"],
    correctAnswer: "B. 20",
  },
  {
    question:
      "Which data type is used to represent a sequence of characters in Python?",
    answers: ["A. int", "B. float", "C. bool", "D. str"],
    correctAnswer: "D. str",
  },
  {
    question:
      "Which data type is used to represent a list of values in Python?",
    answers: ["A. int", "B. float", "C. bool", "D. list"],
    correctAnswer: "D. list",
  },
  {
    question: "Which keyword is used to define a function in Python?",
    answers: ["A. function", "B. define", "C. def", "D. func"],
    correctAnswer: "C. def",
  },
  {
    question: "What is the output of this code: print('hello' + 'world')?",
    answers: [
      "A. hello+world",
      "B. hello world",
      "C. helloworld",
      "D. SyntaxError",
    ],
    correctAnswer: "C. helloworld",
  },
  {
    question: "What is the output of this code: print('hello' * 3)?",
    answers: [
      "A. hellohellohello",
      "B. hello 3",
      "C. hellohello",
      "D. SyntaxError",
    ],
    correctAnswer: "A. hellohellohello",
  },
];
const Python = ({ navigation }) => {
  const [level, setLevel] = useState("");
  if (level === "") {
    return (
      <View style={styles.container}>
        <View>
          <Text style={{fontWeight:"bold",fontSize:50,marginBottom:30}}>Python</Text>
        </View>
        <View>
          <Text style={{fontWeight:"bold",fontSize:30,marginBottom:25}}>LEVELS</Text>
        </View>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            setLevel("easy");
          }}
        >
          <Text style={{fontWeight:"bold",fontSize:30}}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            setLevel("medium");
          }}
        >
          <Text style={{fontWeight:"bold",fontSize:30}}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            setLevel("hard");
          }}
        >
          <Text style={{fontWeight:"bold",fontSize:30}}>Hard</Text>
        </TouchableOpacity>
    
      </View>
    );
  } else {
    return (
      <Quiztemp
        level={level}
        subject="python"
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
});
export default Python;

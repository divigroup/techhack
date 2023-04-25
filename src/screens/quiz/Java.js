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
const Java = ({ navigation }) => {
  const [level, setLevel] = useState("");
  if (level === "") {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            setLevel("easy");
          }}
        >
          <Text>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            setLevel("medium");
          }}
        >
          <Text>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            setLevel("hard");
          }}
        >
          <Text>Hard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            setLevel("expert");
          }}
        >
          <Text>Expert</Text>
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
    backgroundColor: "lightgreen",
    padding: 10,
    width: windowWidth * 0.9,
    marginBottom: 4,
    borderRadius: 10,
    height: windowHeight * 0.1,
  },
});
export default Java;

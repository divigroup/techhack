import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  StatusBar,
  SafeAreaView
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import backimage from "../../../assets/back.png";

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
  // const [questions, setQuestions] = useState();

  const [lastLevel, setLastlevel] = useState(-1);
  const Boiler = async () => {
    const batch = await AsyncStorage.getItem("batch");
    let batchArray = [];

    if (batch) {
      console.log(batch);
      batchArray = batch.split(",");
    }

    for (let i = 0; i < batchArray.length; i++) {
      if (batchArray[i] === "pythonexpert") {
        setLastlevel(3);
      } else if (batchArray[i] === "pythonhard") {
        setLastlevel(2);
      } else if (batchArray[i] === "pythonmedium") {
        setLastlevel(1);
      } else if (batchArray[i] === "pythoneasy") {
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
      <SafeAreaView style={styles.maincontainer}>
        <View style={styles.navbar}>
          {/* <TouchableOpacity
            style={styles.backButton} */}
           
          
            {/* <Image
              source={backimage}
              style={{
                height: StatusBar.currentHeight + 5,
                // width: StatusBar.currentHeight * 2,
                maxWidth: 30,
                maxHeight: 30,
                
              }}
            ></Image> */}
            <Text style={styles.backButton}  onPress={() => {
              navigation.navigate("Message");
            }}>{'<'}</Text>
          {/* </TouchableOpacity> */}
          <Text style={styles.navbartext}>Python</Text>
         
          </View>
          
        <View style={styles.container}>
        
       
        <View>
          
        </View>
        <View>
          <Text style={{ fontWeight: "800", fontSize: 40, marginBottom: 25 }}>
            LEVELS
          </Text>
        </View>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            setLevel("easy");
          }}
        >
          <Text style={{ fontWeight: "400", fontSize: 30,color:"white" }}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={lastLevel >= 0 ? styles.Button : styles.disabledbutton}
          onPress={() => {
            if (lastLevel >= 0) {
              setLevel("medium");
            }
          }}
        >
          <Text style={{ fontWeight: "400", fontSize: 30,color:"white" }}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={lastLevel >= 1 ? styles.Button : styles.disabledbutton}
          onPress={() => {
            if (lastLevel >= 1) {
              setLevel("hard");
            }
          }}
        >
          <Text style={{ fontWeight: "400", fontSize: 30,color:"white"}}>Hard</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
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
  maincontainer:{
    flex:1,
  
  },
  navbar:{
    flexDirection:"row",
    backgroundColor:"purple",
    gap:120,
    alignContent:"center"
  },
  navbartext:{
        paddingTop: StatusBar.currentHeight,
        fontSize: 25,
        color:"white",
        fontWeight:"bold",
        marginLeft:10
               
  },
  backButton: {
    paddingTop: StatusBar.currentHeight,
        fontSize: 40,
        color:"white",
        marginLeft:15,
        marginTop:-10,
        opacity: 0.8,
        fontWeight:150
   
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
    backgroundColor: "purple",
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
export default Python;

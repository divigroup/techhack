import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Question from "./Question";
import Answer from "./Answer";
import { Svg, Circle, Text as SvgText } from "react-native-svg";

import Analysis from "./Analysis";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Quiztemp = ({ level, subject }) => {
  const [questions, setQuestion] = useState([{}]);
  const ques = async () => {
    await fetch("http://192.168.1.36:3000/in/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: subject,
        level: level,
      }),
    })
      .then((res) => res.json())
      .then((data) => setQuestion(data.data));
  };
  useEffect(() => {
    console.log(subject, level);
    ques();
  });
  const [analysis, setAnalysis] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        handleAnswerPress(null);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);
  const progress = timeLeft / 5;
  const circumference = 2 * Math.PI * 25;
  const strokeDashoffset = circumference * (1 - progress);

  const handleAnswerPress = (answer) => {
    clearTimeout();
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex === questions.length - 1) {
      setAnalysis(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(5);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  console.log(currentQuestion?.answers, "c");
  if (analysis === true) {
    return (
      <Analysis
        subject={subject}
        level={level}
        Score={score}
        Totalquestion={questions.length}
      />
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>
            level:{level}
            {"  "}
            {subject}
          </Text>
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <Svg width="50" height="50">
              <SvgText
                x="27"
                y="32"
                textAnchor="middle"
                fontSize={30}
                fontWeight="bold"
                fill="black"
              >
                {timeLeft}
              </SvgText>
              <Circle
                cx="25"
                cy="25"
                r="22"
                fill="transparent"
                stroke="#ffbf00"
                strokeWidth="3"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </Svg>
          </View>

          <Question question={currentQuestion.question} />

          <View style={styles.answerOptionsContainer}>
            {currentQuestion.answers?.map((answer) => (
              <Answer
                key={answer}
                answer={answer}
                onPress={() => handleAnswerPress(answer)}
              />
            ))}
          </View>
          {/* <Text style={styles.scoreText}>Score: {score}</Text> */}
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  questionContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  answerOptionsContainer: {
    flex: 2,
    alignItems: "stretch",
    width: windowWidth * 0.9,
    // justifyContent: "center",
  },
  answerOptionButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#c4c4c4",
    padding: 20,
    marginVertical: 10,
  },
  questionText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Quiztemp;

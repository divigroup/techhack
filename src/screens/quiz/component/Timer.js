import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Svg, Circle } from "react-native-svg";

const Timer = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onComplete]);

  const progress = timeLeft / duration;
  const circumference = 2 * Math.PI * 25;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={styles.timerContainer}>
      <Svg width="50" height="50">
        <Circle
          cx="25"
          cy="25"
          r="22"
          fill="transparent"
          stroke="#fff"
          strokeWidth="3"
        />
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
      <Text style={styles.timerText}>{timeLeft} seconds left</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Timer;

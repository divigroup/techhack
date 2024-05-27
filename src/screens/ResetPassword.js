import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
// import {  } from "react-native-gesture-handler";

export default function ResetPassword() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View
          style={{
            alignItems: "center",
            paddingVertical: 10,
            gap: 1,
          }}
        >
          <Text
            style={{
              color: "#d3d3d3",
              fontSize: 80,
              fontWeight: "bold",
              marginBottom: 80,
            }}
          >
            Reset password
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

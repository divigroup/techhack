import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const LandingScreen = ({ navigation }) => {
  const navigate = (page) => {
    navigation.navigate(page);
  };
  return (
    <View style={styles.container}>
      <Text style= {{fontSize: 35,fontWeight: 'bold', marginBottom: 10}}>Prepare by topics!</Text>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          navigate("python");
        }}
      >
        <Text style={{color: "black", fontWeight: "bold",fontSize: 30,textAlign:"left",paddingTop:40}}>Python</Text>
        <View style={{paddingTop:40}}>
          <Image
              source={require("../../assets/python.png")}
              style={{width:80,height:80,alignSelf: 'flex-end',opacity:0.4}}
            ></Image>

        </View>
        
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          navigate("c");
        }}
      >
        <Text style={{color: "black", fontWeight: "bold",fontSize: 30,textAlign:"left",paddingTop:40}}>C++</Text>
        <View style={{paddingTop:40}}>
          <Image
              source={require("../../assets/python.png")}
              style={{width:80,height:80,alignSelf: 'flex-end',opacity:0.4}}
            ></Image>

        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          navigate("java");
        }}
      >
        <Text style={{color: "black", fontWeight: "bold",fontSize: 30,textAlign:"left",paddingTop:40}}>JavaScript</Text>
        <View style={{paddingTop:40}}>
          <Image
              source={require("../../assets/python.png")}
              style={{width:80,height:80,alignSelf: 'flex-end',opacity:0.4}}
            ></Image>

        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    padding: "10%",
    alignSelf: "center",
    alignItems: "center",
  },
  Button: {
    marginBottom: 20,
    height: 150,
    backgroundColor:"white",
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",

    borderWidth: 2,
    borderColor:"#d3d3d3",
    padding: 10,
    width: windowWidth * 0.9,
    borderRadius: 10,
    // height: windowHeight * 0.1,
  },
});
export default LandingScreen;

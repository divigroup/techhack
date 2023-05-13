import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  SafeAreaView
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
      <SafeAreaView style={styles.maincontainer}>
        <View style={styles.navbar}>
          
            <Text style={styles.backButton} onPress={() => {
              navigation.navigate("Message");
            }}>{'<'}</Text>
          <Text style={styles.navbartext}>C</Text>
         
          </View>
        <View style={styles.container}>
        
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
          <Text style={{ fontWeight: "400", fontSize: 30,color:"white"  }}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={lastLevel >= 0 ? styles.Button : styles.disabledbutton}
          onPress={() => {
            if (lastLevel >= 0) {
              setLevel("medium");
            }
          }}
        >
          <Text style={{fontWeight: "400", fontSize: 30,color:"white" }}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={lastLevel >= 1 ? styles.Button : styles.disabledbutton}
          onPress={() => {
            if (lastLevel >= 1) {
              setLevel("hard");
            }
          }}
        >
          <Text style={{ fontWeight: "400", fontSize: 30,color:"white"  }}>Hard</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
      
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
        marginLeft:10,
        marginLeft:40
               
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
    marginBottom: 20,
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

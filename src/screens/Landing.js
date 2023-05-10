import { View, Text,Image,StyleSheet,StatusBar,TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Landing({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        <View>
  
     <Image
            source={require("../../assets/image1.jpg")}
            style={styles.image}
          ></Image>
    <TouchableOpacity
            style={styles.button}
            onPress={()=>{navigation.navigate("Login")}}
          >
            <Text style={{color: "white",textAlign:"center"}}>Login</Text>
          </TouchableOpacity>

           <TouchableOpacity
            style={styles.button}
            onPress={()=>{navigation.navigate("Signup")}}
          >
            <Text style={{color: "white",textAlign:"center"}}>Register</Text>
          </TouchableOpacity>

    </View>

    </SafeAreaView>
    
  )
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight * 3,
    backgroundColor:"#e1a9ce",
  },

  image: {
    width: 420,
    height: 450,
    resizeMode: 'stretch',
  },
  button: {
    padding: 13,
    paddingHorizontal: 30,
    width: "60%",
    marginLeft: 88,
    marginTop: 20,
    backgroundColor: "purple",
    borderRadius: 20,
    marginBottom: 10,
  }




})
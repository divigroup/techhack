import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Signup from "./src/screens/Signup";
import Login from "./src/screens/Login";
import Message from "./src/screens/Message";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-community/async-storage";
import { Text, TouchableOpacity } from "react-native";
import Leftheader from "./src/screens/Leftheader";
// import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import SideMenu from "react-native-side-menu-updated";
import Python from "./src/screens/quiz/Python";
import C from "./src/screens/quiz/C";
import Java from "./src/screens/quiz/Java";
import Analysis from "./src/screens/quiz/component/Analysis";

const Stack = createNativeStackNavigator();

function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitle: "", headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="python" component={Python} />
        <Stack.Screen name="c" component={C} />
        <Stack.Screen name="java" component={Java} />
        <Stack.Screen name="analysis" component={Analysis} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

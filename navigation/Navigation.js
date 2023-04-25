import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Signup from "../src/screens/Signup";
import Login from "../src/screens/Login";
import Message from "../src/screens/signinmessage";
const Screens = {
  Signup: {
    screen: Signup,
  },
  Login: {
    screen: Login,
  },
  Message: {
    screen: Message,
  },
};
const HomeStack = createStackNavigator(Screens);
export default createAppContainer(HomeStack);

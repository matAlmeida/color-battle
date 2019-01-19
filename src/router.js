import { Platform } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

import SignIn from "@app/signIn/SignInContainer";
import SignUp from "@app/signUp/SignUpContainer";
import MainScreen from "@app/main/MainContainer";

const MainNavigator = createMaterialTopTabNavigator(
  {
    T1: MainScreen,
    Home: MainScreen,
    T2: MainScreen
  },
  {
    initialRouteName: "Home",
    style: {
      ...Platform.select({
        android: { paddingTop: 24 }
      })
    }
  }
);

const Routes = createStackNavigator(
  {
    SignIn,
    SignUp,
    Main: {
      screen: MainNavigator,
      navigationOptions: { header: null }
    }
  },
  {
    initialRouteName: "Main"
  }
);

export default createAppContainer(Routes);

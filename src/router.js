import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import SignIn from "@app/signIn/SignInContainer";
import SignUp from "@app/signUp/SignUpContainer";
import MainScreen from "@app/main/MainContainer";

const Main = createBottomTabNavigator({
  MainScreen
});

const Routes = createStackNavigator(
  {
    SignIn,
    SignUp,
    Main: {
      screen: Main,
      navigationOptions: { header: null }
    }
  },
  {
    initialRouteName: "Main"
  }
);

export default createAppContainer(Routes);

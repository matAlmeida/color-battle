import { createAppContainer, createStackNavigator } from "react-navigation";

import SignIn from "@app/signIn/SignInContainer";
import SignUp from "@app/signUp/SignUpContainer";
import Main from "@app/main/MainContainer";

const Routes = createStackNavigator(
  {
    SignIn,
    SignUp,
    Main
  },
  {
    initialRouteName: "Main"
  }
);

export default createAppContainer(Routes);

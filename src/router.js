import { createAppContainer, createStackNavigator } from "react-navigation";

import SignIn from "@app/signIn/SignInScreen";

const Routes = createStackNavigator({
  SignIn
});

export default createAppContainer(Routes);

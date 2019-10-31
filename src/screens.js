import { createStackNavigator, createAppContainer } from "react-navigation";

import Main from './pages/main';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';

const Routes = createStackNavigator({
  Main,
  SignIn,
  SignUp,
});

export default createAppContainer(Routes);
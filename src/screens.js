import { createStackNavigator, createAppContainer } from "react-navigation";

import Mapa from './pages/mapa';
import Camera from './pages/camera';
// import Sugerir from './pages/sugerir';
import Arvore from './pages/arvore';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';

const Routes = createStackNavigator({
  Mapa,
  Camera,
  // Sugerir,
  Arvore,
  SignIn,
  SignUp,
});

export default createAppContainer(Routes);
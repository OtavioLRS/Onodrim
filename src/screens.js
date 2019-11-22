import { createStackNavigator, createAppContainer } from "react-navigation";

import Mapa from './pages/mapa';
import Camera from './pages/camera';
import Especie from './pages/especie';
import Arvore from './pages/arvore';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';

const Routes = createStackNavigator({
  Mapa,
  SignIn,
  SignUp,
  Camera,
  Arvore,
  Especie,
});

export default createAppContainer(Routes);
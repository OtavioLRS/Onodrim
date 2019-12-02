import { createStackNavigator, createAppContainer } from "react-navigation";

import Mapa from './pages/mapa';
import Camera from './pages/camera';
import Especie from './pages/especie';
import Arvore from './pages/arvore';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Checagem from './pages/checagem';
import Detalhes from './pages/detalhes';

const Routes = createStackNavigator({
  SignIn,
  SignUp,
  Mapa,
  Camera,
  Arvore,
  Especie,
  Checagem,
  Detalhes,
});

export default createAppContainer(Routes);
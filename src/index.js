import React, {Component} from 'react';

import Routes from './screens';

import { createAppContainer } from 'react-navigation';
import { requestLocationPermission } from './services/locationPermission';

const AppContainer = createAppContainer(Routes);

export default class App extends Component {
  
  async componentDidMount() {
    await requestLocationPermission();
  }

  render(){
    return(
      <AppContainer />
    )
  }
}

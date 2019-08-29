import React, {Component} from 'react';

import Routes from './screens';

import { createAppContainer } from 'react-navigation';

const AppContainer = createAppContainer(Routes);

export default class App extends Component {
  render(){
    return(
      <AppContainer />
    )
  }
}

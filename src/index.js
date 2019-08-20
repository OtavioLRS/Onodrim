import React, {Component} from 'react';

import Routes from './routes';

import { createAppContainer } from 'react-navigation';

const AppContainer = createAppContainer(Routes);

export default class App extends Component {
  render(){
    return(
      <AppContainer />
    )
  }
}

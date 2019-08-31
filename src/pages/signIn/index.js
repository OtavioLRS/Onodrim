import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

//import routes from '../../services/routes';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  SignInLink,
  SignInLinkText,
  SignUpLink,
  SignUpLinkText,
} from './styles';

export default class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    email: 'admin@adminnnn',
    senha: 'admin',
    error: '',
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handleSenhaChange = (senha) => {
    this.setState({ senha });
  };

  handleCreateAccountPress = () => {
    this.props.navigation.navigate('SignUp');
  };

  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.senha.length === 0) {
      this.setState({ error: 'Insira seu e-mail e senha para continuar!' }, () => false);
    } else {
      try {
        // await routes.post('/users', JSON.stringify({
        //   email: this.state.email,
        //   senha: this.state.senha,
        // }));

        //.then(response => response.json()).then(users => console.warn(users));

        

      

        
        // const resetAction = StackActions.reset({
        //   index: 0,
        //   actions: [
        //     NavigationActions.navigate({ routeName: 'Main', params: { token: response.data.token } }),
        //   ],
        // });
        // this.props.navigation.dispatch(resetAction);
        // if (this.state.email == 'admin@adminnnn' && this.state.senha == 'admin'){
        //   const resetAction = StackActions.reset({
        //     index: 0,
        //     actions: [
        //       NavigationActions.navigate({ routeName: 'Main' }),
        //     ],
        //   });
        //   this.props.navigation.dispatch(resetAction);
        // }

      } catch (_err) {
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
      }
    }
  };

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Logo source={require('../../images/logo.png')} resizeMode="contain" />
        <Input
          placeholder="Endereço de e-mail"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Senha"
          value={this.state.senha}
          onChangeText={this.handleSenhaChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
        <SignInLink onPress={this.handleSignInPress}>
          <SignInLinkText>Entrar</SignInLinkText>
        </SignInLink>
        <SignUpLink onPress={this.handleCreateAccountPress}>
          <SignUpLinkText>Cadastrar-se</SignUpLinkText>
        </SignUpLink>
      </Container>
    );
  }
}
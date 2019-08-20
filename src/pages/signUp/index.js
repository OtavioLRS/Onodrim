import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar } from 'react-native';

import api from '../../services/api';
import { StackActions, NavigationActions } from 'react-navigation';

import {
  Container,
  Logo,
  SuccessMessage,
  Input,
  ErrorMessage,
  SignUpLink,
  SignUpLinkText,
  SignInLink,
  SignInLinkText,
} from './styles';

export default class SignUp extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };

  state = {
    username: 'admin',
    email: 'admin@admin',
    password: 'admin',
    error: '',
    success: '',
  };

  handleUsernameChange = (username) => {
    this.setState({ username });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleBackToLoginPress = () => {
    this.props.navigation.goBack();
  };

  handleSignUpPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
    } else {
      try {
        if (this.state.email == 'admin@admin' && this.state.username == 'admin' && this.state.password == 'admin')
         {
          this.setState({ success: 'Conta criada com sucesso! Redirecionando para o login', error: '' });

          setTimeout(this.goToLogin, 2500);
         } 

        // await api.post('/users', {
        //   username: this.state.username,
        //   email: this.state.email,
        //   password: this.state.password,
        // });

        this.setState({ success: 'Conta criada com sucesso! Redirecionando para o login', error: '' });

        setTimeout(this.goToLogin, 2500);
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });
      }
    }
  };

  goToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SignIn' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Logo source={require('../../images/airbnb_logo.png')} resizeMode="contain" />
        {this.state.success.length !== 0 && <SuccessMessage>{this.state.success}</SuccessMessage>}
        <Input
          placeholder="Nome completo"
          value={this.state.username}
          onChangeText={this.handleUsernameChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Endereço de e-mail"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Senha"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
        <SignInLink onPress={this.handleSignUpPress}>
          <SignInLinkText>Criar conta</SignInLinkText>
        </SignInLink>
        <SignUpLink onPress={this.handleBackToLoginPress}>
          <SignUpLinkText>Retornar</SignUpLinkText>
        </SignUpLink>
      </Container>
    );
  }
}

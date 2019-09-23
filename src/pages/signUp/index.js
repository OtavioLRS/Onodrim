import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar } from 'react-native';

// import routes from '../../services/routes';
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
    nome: 'admin',
    email: '',
    senha: 'admin',
    error: '',
    success: '',
  };

  handleNomeChange = (nome) => {
    this.setState({ nome });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handleSenhaChange = (senha) => {
    this.setState({ senha });
  };

  handleBackToLoginPress = () => {
    this.props.navigation.goBack();
  };

  handleSignUpPress = async () => {
    if (this.state.nome.length === 0 || this.state.email.length === 0 || this.state.senha.length === 0) {
      this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
    } else {
        // await fetch('http://192.168.0.107:3333/signup', {
        await fetch('http://192.168.43.169:3333/signup', {
        // await fetch('http://172.16.222.76:3333/signup', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
          }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.ok === false)
            this.setState({ error: 'O e-mail inserido já é cadastrado!' }, () => false);
          else {
            this.setState({ success: 'Conta criada com sucesso! Retornando para a tela de login', error: '' });
            setTimeout(this.goToLogin, 2500);
          }
        })
          .catch(function (error) {
            alert(error.message);
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
          });
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
        <Logo source={require('../../images/logo.png')} resizeMode="contain" />
        {this.state.success.length !== 0 && <SuccessMessage>{this.state.success}</SuccessMessage>}
        <Input
          placeholder="Nome completo"
          value={this.state.nome}
          onChangeText={this.handleNomeChange}
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
          value={this.state.senha}
          onChangeText={this.handleSenhaChange}
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

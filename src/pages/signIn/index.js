import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  SignInLink,
  SignInLinkText,
  SignUpLink,
  SignUpLinkText,
  styles
} from './styles';

export default class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: 'adm',
    senha: 'adm',
    error: '',
    loading: false,
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
        this.setState({loading:true});
        await fetch('http://192.168.0.102:3333/signin', {
        // await fetch('http://192.168.43.169:3333/signin', {
      // await fetch('http://186.217.108.38:3333/signin', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.email,
            senha: this.state.senha
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (typeof (responseJson[0][0].erro) !== "undefined"){
              this.setState({ error: responseJson[0][0].erro }, () => false);
              this.setState({loading:false});
            }
            else {
              AsyncStorage.setItem('usuario', JSON.stringify(responseJson[0][0]));
              console.log(responseJson);
              this.setState({ loading: false });
              this.logIn();
            }
          })
          .catch((error) => {
            alert(error);
            throw error;
          });
    }
  };

  logIn = async () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Mapa' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

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

        {this.state.loading &&
          <View style={styles.loading}>
            <ActivityIndicator size='large'/>
          </View>
        }
      </Container>
    );
  }
}

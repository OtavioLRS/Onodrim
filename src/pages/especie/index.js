import React, { Component } from 'react';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { styles, Container, Input, ButtonSugerir, ButtonSugerirText, SuccessMessage, ErrorMessage } from './styles';
import AsyncStorage from '@react-native-community/async-storage';

export default class Especie extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    nome_popular: '',
    nome_cientifico: '',
    fruto: '',
    utilidade: '',
    success: '',
    error: '',
    usuario: '',
    loading: false,
    editable: true,
  }

  navegar(rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: rota }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  async componentDidMount() {
    const usuario = JSON.parse(await AsyncStorage.getItem('usuario'));
    this.setState({usuario: usuario.email});
  }

  handleNomeChange = (nome_popular) => {
    this.setState({ nome_popular });
  }
  
  handleNomeCientChange = (nome_cientifico) => {
    this.setState({ nome_cientifico });
  }

  handleFrutoChange = (fruto) => {
    this.setState({ fruto });
  }

  handleUtilidadeChange = (utilidade) => {
    this.setState({ utilidade });
  }

  handleSugerirPress = async () => {
    if(this.state.nome_popular == '')
      this.setState({error: 'Insira um nome para a espécie!'});
    else if (this.state.nome_cientifico == '')
      this.setState({error: 'Insira o nome científico da espécie!'});
    else {
      this.setState({loading: true, editable: false});
      const body = {
        nome_popular: this.state.nome_popular,
        nome_cientifico: this.state.nome_cientifico,
        fruto: this.state.fruto,
        utilidade: this.state.utilidade,
        usuario: this.state.usuario
      }
      await fetch('http://192.168.0.102:3333/sugerir', {
      // await fetch('http://192.168.43.169:3333/sugerir', {
      // await fetch('http://186.217.108.38:3333/sugerir', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(response => response.json())
        .then(response => {
          if (Array.isArray(response)) {
            this.setState({ error: response[0][0].erro, loading: false });
            setTimeout(() => { this.navegar('Mapa') }, 3500);
          }
          else {
            this.setState({ success: 'Espécie sugerida com sucesso!', error: '', loading: false });
            setTimeout(() => { this.navegar('Mapa') }, 3500);
          }
        })
    }
  }

  render() {
    return(
      <Container>
        <Input
          placeholder="Nome"
          value={this.state.nome_popular}
          onChangeText={this.handleNomeChange}
          autoCapitalize="sentences"
          autoCorrect={false}
          editable={this.state.editable}
        />

        <Input
          placeholder="Nome científico"
          value={this.state.nome_cientifico}
          onChangeText={this.handleNomeCientChange}
          autoCapitalize="sentences"
          autoCorrect={false}
          editable={this.state.editable}
        />

        <Input
          placeholder="Fruto"
          value={this.state.fruto}
          onChangeText={this.handleFrutoChange}
          autoCapitalize="sentences"
          autoCorrect={false}
          editable={this.state.editable}
        />

        <Input
          placeholder="Utilidades"
          value={this.state.utilidade}
          onChangeText={this.handleUtilidadeChange}
          autoCapitalize="sentences"
          autoCorrect={false}
          multiline={true}
          editable={this.state.editable}
        />

        {this.state.success.length !== 0 && <SuccessMessage>{this.state.success}</SuccessMessage>}

        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}

        <ButtonSugerir onPress={this.handleSugerirPress}>
          <ButtonSugerirText>Fazer sugestão</ButtonSugerirText>
        </ButtonSugerir>

        {this.state.loading &&
          <View style={styles.loading}>
            <ActivityIndicator size='large' />
          </View>
        }

      </Container>
    )
  }
}

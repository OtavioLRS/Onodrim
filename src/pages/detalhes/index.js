import { Alert, StatusBar, ActivityIndicator, Image, View, Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';

import {
  styles,
  Container,
  Input,
  ButtonBack,
  ButtonBackText,
} from './styles';

export default class Detalhes extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    editable: false,
    altura: '',
    largura: '',
    data_plantio: '',
    nome_popular: '',
    nome_cientifico: '',
    usuario: '',
    foto: null,
  }

  async componentDidMount() {
    let arvore = JSON.parse(await AsyncStorage.getItem('marker'));
    if (arvore.altura != null) arvore.altura = arvore.altura.toString();
    if (arvore.largura != null) arvore.largura = arvore.largura.toString();
    this.setState({
      nome_popular: arvore.nome_popular,
      nome_cientifico: arvore.nome_cientifico,
      altura: arvore.altura,
      largura: arvore.largura,
      data_plantio: arvore.data_plantio,
      fotos: arvore.fotos
    })
  }

  navegar(rota) {
    const navegar = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: rota }),
      ],
    });
    this.props.navigation.dispatch(navegar);
  }

  render() {
    return (
      <Container>
        <StatusBar hidden />

        <View style={styles.imagem, {marginBottom: 10, borderbackgroundColor: '#FFF'}}>
          <Image source={{ uri: this.state.fotos }} style={styles.imagem} resizeMode='cover' />
        </View>

        <ButtonBackText style={{marginBottom: 5 }}>Nome</ButtonBackText>
        <Input
          value={this.state.nome_popular}
          autoCapitalize="none"
          autoCorrect={false}
          editable={this.state.editable}
        />

        <ButtonBackText style={{marginBottom: 5 }}>Nome cientifico</ButtonBackText>
        <Input
          value={this.state.nome_cientifico}
          autoCapitalize="none"
          autoCorrect={false}
          editable={this.state.editable}
        />

        <ButtonBackText style={{marginBottom: 5 }}>Altura</ButtonBackText>
        <Input
          value={this.state.altura}
          autoCapitalize="none"
          autoCorrect={false}
          editable={this.state.editable}
        />

        <ButtonBackText style={{marginBottom: 5 }}>Largura</ButtonBackText>
        <Input
          value={this.state.largura}
          autoCapitalize="none"
          autoCorrect={false}
          editable={this.state.editable}
        />

        <ButtonBackText style={{marginBottom: 5 }}>Data de plantio</ButtonBackText>
        <Input
          value={this.state.data_plantio}
          autoCapitalize="none"
          autoCorrect={false}
          editable={this.state.editable}
        />

        <ButtonBack
          onPress={() => this.navegar('Mapa')}>
          <ButtonBackText>Voltar</ButtonBackText>
        </ButtonBack>

      </Container>
    );
  }
}
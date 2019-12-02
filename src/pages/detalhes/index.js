import { Alert, StatusBar, ActivityIndicator, Image, View } from 'react-native';
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
    
  }

  async componentDidMount() {
    let arvore = JSON.parse(await AsyncStorage.getItem('marker'));
    console.log(arvore);
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
        <Image source={{ uri: this.state.fotos }} style={styles.imagem} />

        <Input
          placeholder="Altura"
          value={this.state.altura}
          onChangeText={this.handleAlturaChange}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={'numeric'}
          editable={this.state.editable}
        />

        <Input
          placeholder="Largura"
          value={this.state.largura}
          onChangeText={this.handleLarguraChange}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={'numeric'}
          editable={this.state.editable}
        />

        <Input
          placeholder="Data plantio (DD/MM/AAAA)"
          value={this.state.data_plantio}
          onChangeText={this.handlePlantioChange}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={'numeric'}
          editable={this.state.editable}
        />

        <Input
          placeholder="CEP"
          value={this.state.cep}
          onChangeText={this.handleCEPChange}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={'numeric'}
          editable={this.state.editable}
        />

        <Input
          placeholder="Cidade"
          value={this.state.cidade}
          onChangeText={this.handleCidadeChange}
          autoCapitalize="words"
          autoCorrect={false}
          editable={this.state.editable}
        />

        <Input
          placeholder="Bairro"
          value={this.state.bairro}
          onChangeText={this.handleBairroChange}
          autoCapitalize="words"
          autoCorrect={false}
          editable={this.state.editable}
        />

        <Input
          placeholder="Rua"
          value={this.state.rua}
          onChangeText={this.handleRuaChange}
          autoCapitalize="words"
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
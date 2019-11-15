import { StatusBar, ScrollView, Text, Image, Picker, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';

import { styles, Container, Input } from './styles';
import cep from 'cep-promise';
export default class Arvore extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    id_tipo: '',
    fotos: '',
    altura: '',
    largura: '',
    data_plantio: '',
    cep: '',
    rua: '',
    bairro: '',
    cidade: '', 
  }

  async componentDidMount() {
    const value = JSON.parse(await AsyncStorage.getItem('foto'));
    
    this.setState({fotos: value.path});
  }

  handleAlturaChange = (altura) => {
    const { length } = altura;
    if (altura.substring(length-1, length) == ',')
      altura = altura.substring(0, length - 1);
    else {
      const aux = altura.split('.');
      if (aux.length > 2)
        altura = altura.substring(0, length - 1);
    }
    this.setState({ altura });
  }

  handleLarguraChange = (largura) => {
    const { length } = largura;
    if (largura.substring(length-1, length) == ',')
      largura = largura.substring(0, length - 1);
    else {
      const aux = largura.split('.');
      if(aux.length > 2)
        largura = largura.substring(0, length - 1);
    }
    this.setState({ largura });
  }

  handlePlantioChange = (data_plantio) => {
    const { length } = data_plantio;
    if (length > this.state.data_plantio.length){
      if (length == 2 || length == 5)
        data_plantio = data_plantio.concat('/');
      else if (length > 10)
        data_plantio = data_plantio.substring(0, length - 1);
    }
    else {
      if (length == 3 || length == 6)
        data_plantio = data_plantio.substring(0, length - 1);
    }
    this.setState({ data_plantio });
  }

  handleCEPChange = (CEP) => {
    const { length } = CEP;
    if(length == 8) {
      cep(CEP).then((value) => {
        this.setState({ 
          cidade: value.city,
          bairro: value.neighborhood,
          rua: value.street,
        })
      });
    } else if(length > 8) 
      CEP = CEP.substring(0, length - 1);
    this.setState({ cep: CEP });
  }

  handleCidadeChange = (cidade) => {
    this.setState({ cidade });
  }

  handleBairroChange = (bairro) => {
    this.setState({ bairro });
  }

  handleRuaChange = (rua) => {
    this.setState({ rua });
  }
  
  render(){
    return(
      <Container>
        <StatusBar hidden/>
        <Image source={{uri: this.state.fotos}} style={styles.imagem}/>
        
        <Input 
          placeholder="Altura"
          value={this.state.altura}
          onChangeText={this.handleAlturaChange}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={'numeric'}
        />

        <Input
          placeholder="Largura"
          value={this.state.largura}
          onChangeText={this.handleLarguraChange}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={'numeric'}
        />

        <Input
          placeholder="Data plantio (DD/MM/AAAA)"
          value={this.state.data_plantio}
          onChangeText={this.handlePlantioChange}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={'numeric'}
        />

        <Picker
          style={styles.picker}
          selectedValue={this.state.id_tipo}
          onValueChange={(index, value) => {
            this.setState({ id_tipo: index });
          }}
        >
          <Picker.Item label="Selecione uma espécie (CAMPO OBRIGATÓRIO)" value='0'/>
        </Picker>

        <Input
          placeholder="CEP"
          value={this.state.cep}
          onChangeText={this.handleCEPChange}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={'numeric'}
        />
        
        <Input
          placeholder="Cidade"
          value={this.state.cidade}
          onChangeText={this.handleCidadeChange}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Input
          placeholder="Bairro"
          value={this.state.bairro}
          onChangeText={this.handleBairroChange}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Input
          placeholder="Rua"
          value={this.state.rua}
          onChangeText={this.handleRuaChange}
          autoCapitalize="none"
          autoCorrect={false}
        />

      </Container>
    );
  }
}
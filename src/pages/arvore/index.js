import { Alert, StatusBar, ActivityIndicator, Image, Picker, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import cep from 'cep-promise';

import { 
  styles, 
  Container, 
  Input, 
  ButtonCadastro, 
  ButtonCadastroText,
  ButtonBack,
  ButtonBackText, 
  ErrorMessage, 
  SuccessMessage, 
} from './styles';

export default class Arvore extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    id_tipo: '',
    fotos: null,
    altura: '',
    largura: '',
    data_plantio: '',
    cep: '',
    rua: '',
    bairro: '',
    cidade: '',
    latitude: '',
    longitude: '', 
    itensEspecies: [],
    error: '',
    success: '',
    loading: true,
    editable: false
  }

  async componentDidMount() {
    const foto = JSON.parse(await AsyncStorage.getItem('foto'));
    const local = JSON.parse(await AsyncStorage.getItem('local'));
    await AsyncStorage.removeItem('foto');
    await AsyncStorage.removeItem('local');
    const { latitude, longitude } = local;
    this.setState({fotos: foto.path, latitude, longitude});

    await fetch('https://onodrim.herokuapp.com/tipos', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        let x=0;
        response.forEach(element => {
          this.state.itensEspecies[x++] = element;
        });
        this.setState({ loading: false, editable: true })
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
      if (length == 3 || length == 6)
        data_plantio = [data_plantio.slice(0, length - 1), '/', data_plantio.slice(length - 1)].join('');
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
      this.setState({loading: true});
      cep(CEP).then((value) =>
        this.setState({ 
          cidade: value.city,
          bairro: value.neighborhood,
          rua: value.street,
        }))
      .catch(e => {
        alert('CEP não encontrado!');
      });
      this.setState({loading:false});
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

  handleCancel = () => {
    Alert.alert(
      'Aviso!',
      'Deseja realmente cancelar o cadastro da árvore?',
      [
        {text: 'Não', onPress: () => {}},
        {text: 'Sim', onPress: () => {this.navegar('Mapa')}},
      ],
      { cancelable: false },  
    )
  }

  createFormData(foto, body) {
    const data = new FormData();
    let type = foto.split('.');
    type = type[type.length-1];
    
    data.append('fotos', {
      name: foto,
      type: 'image/'+type,
      uri: foto,
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    return (data);
  }

  handleConcluir = async () => {
    if (this.state.id_tipo == ''){
      this.setState({ error: 'Escolha uma espécie para a árvore!' }, () => false);
      return;
    }
    else {
      this.setState({ loading: true, editable: false });
      const body = {
        id_tipo: '',
        latitude: '',
        longitude: '',
        cep: '',
        rua: '',
        bairro: '',
        cidade: '',
        altura: '',
        largura: '',
        data_plantio: '',
      }
      if (this.state.cep != '')
        body.cep = parseInt(this.state.cep)
      else body.cep = null;
      if (this.state.altura != '')
        body.altura = parseFloat(this.state.altura)
      else body.altura = null;
      if (this.state.largura != '')
        body.largura = parseFloat(this.state.largura)
      else body.largura = null;
      body.id_tipo = parseInt(this.state.id_tipo)
      body.latitude = this.state.latitude;
      body.longitude = this.state.longitude;
      body.rua = this.state.rua;
      body.bairro = this.state.bairro;
      body.cidade = this.state.cidade;
      body.data_plantio = this.state.data_plantio;

      await fetch('https://onodrim.herokuapp.com/arvore', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: this.createFormData(this.state.fotos, body),
      })
        .then(response => response.json())
        .then(response => {
          if (Array.isArray(response))
            this.setState({ error: response[0][0].erro, loading: false });
          else
            this.setState({ success: 'Árvore cadastrada com sucesso!', error: '', loading: false });
        })
        .catch(e => {
          alert(e);
        })
        setTimeout(() => {this.navegar('Mapa')}, 3500);
    }
  }

  render() {
    let listaEspecies = this.state.itensEspecies.map((especie) => {
      return (<Picker.Item value={especie.id_tipo} label={especie.nome_cientifico} key={especie.id_tipo}/>);
    })

    return(
      <Container>
        <StatusBar hidden/>
        <Image source={{uri: this.state.fotos}} style={styles.imagem}/>

        <Picker
          style={styles.picker}
          selectedValue={this.state.id_tipo}
          onValueChange={(index, value) => {
            this.setState({ id_tipo: index });
          }}
          editable={this.state.editable}
        >
          <Picker.Item label="Espécie (CAMPO OBRIGATÓRIO)" value='0'/>
          {listaEspecies}
        </Picker>

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

        {this.state.success.length !== 0 && <SuccessMessage>{this.state.success}</SuccessMessage>}

        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}

        <ButtonCadastro
          onPress={this.handleConcluir}>
          <ButtonCadastroText>Concluir</ButtonCadastroText>
        </ButtonCadastro>

        <ButtonBack
          onPress={this.handleCancel}>
          <ButtonBackText>Cancelar</ButtonBackText>
        </ButtonBack>

        {this.state.loading && 
          <View style={styles.loading}>
            <ActivityIndicator size='large'/>
          </View>  
        }
      </Container>
    );
  }
}
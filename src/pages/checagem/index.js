import React, { Component } from 'react';
import { Alert, StatusBar, ActivityIndicator, View, Image, TouchableOpacity, Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { styles, Container, Input, ButtonBack, ButtonBackText } from './styles';
import AsyncStorage from '@react-native-community/async-storage';

export default class Checagem extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    nome_popular: '',
    nome_cientifico: '',
    fruto: '',
    utilidade: '',
    loading: false,
    temSugestao: true,
    sugestoes: [],
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
    await fetch('https://onodrim.herokuapp.com/sugestoes)', {
    // await fetch('http://192.168.0.103:3333/sugestoes)', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log(response);
        if(!Array.isArray(response)){
          response.forEach(e => {
            this.state.sugestoes.push(e);
          })
          const sug = this.state.sugestoes.shift();
          this.state.nome_popular = sug.nome_popular;
          this.state.nome_cientifico = sug.nome_cientifico;
          this.state.fruto = sug.fruto;
          this.state.utilidade = sug.utilidade;
        }
        else this.setState({temSugestao: false})
      })
      .catch(e => alert(e));
  }

  handleSugerirPress = async (option) => {
    this.setState({loading: true});
    await fetch('https://onodrim.herokuapp.com/checar)', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({nome_cientifico: this.state.nome_cientifico, checado: option}),
    })
      .then(response => response.json())
      .then(response => {
        if (Array.isArray(response)) {
          switch (option) {
            case 0: alert('Sugestão recusada com sucesso!'); break;
            case 2: alert('Sugestão aceita com sucesso!'); break;
          }
          this.setState({ loading: false });
          const sug = this.state.sugestoes.shift();
          if(this.state.sugestoes.length == 0)
            this.setState({temSugestao: false});

          else this.setState({
            nome_cientifico: sug.nome_cientifico,
            nome_popular: sug.nome_popular,
            fruto: sug.fruto,
            utilidade: sug.utilidade,
          });
        }
        else alert('Ocorreu um erro!');
      })

  }

  render() {
    return (
      <Container>
        <StatusBar hidden />

        {!this.state.temSugestao &&
          <View>
            <Text>NÃO TEM SUGESTAO</Text>
          </View>
        }

        {this.state.temSugestao &&
          <View>
          <Input
            placeholder="Nome"
            value={this.state.nome_popular}
            editable={false}
          />

          <Input
            placeholder="Nome científico"
            value={this.state.nome_cientifico}
            editable={false}
          />

          <Input
            placeholder="Fruto"
            value={this.state.fruto}
            editable={false}
          />

          <Input
            placeholder="Utilidades"
            value={this.state.utilidade}
            multiline={true}
            editable={false}
          />
          </View>
        }

        {this.state.temSugestao &&
        <View style={styles.botao}>
          <TouchableOpacity onPress={() => {
            Alert.alert(
              'Aviso!',
              'Deseja realmente recusar esta sugestão de espécie?',
              [
                { text: 'Não', onPress: () => { } },
                { text: 'Sim', onPress: () => { this.handleSugerirPress(1) } },
              ],
              { cancelable: false },
            )
          }}>
            <Image
              style={{ height: 50, width: 50, marginRight: 50 }}
              source={require('../../images/no.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { 
            Alert.alert(
              'Aviso!',
              'Deseja realmente aceitar esta sugestão de espécie?',
              [
                { text: 'Não', onPress: () => { } },
                { text: 'Sim', onPress: () => { this.handleSugerirPress(2) } },
              ],
              { cancelable: false },
            )
          }}>
            <Image
              style={{ height: 50, width: 50 }}
              source={require('../../images/yes.png')}
            />
          </TouchableOpacity>
        </View>
        }

        <ButtonBack onPress={() => { this.navegar('Mapa') }}>
          <ButtonBackText>Voltar</ButtonBackText>
        </ButtonBack>

        {this.state.loading &&
          <View style={styles.loading}>
            <ActivityIndicator size='large' />
          </View>
        }

      </Container>
    )
  }
}

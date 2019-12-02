import React, { Component } from 'react';
import { Alert, StatusBar, ActivityIndicator, View, Image, TouchableOpacity, Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { styles, Container, Input, ButtonBack, ButtonBackText } from './styles';

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
    await fetch('https://onodrim.herokuapp.com/sugestoes', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        if(response.length != 0) {
          response.forEach(e => {
            this.state.sugestoes.push(e);
          })

          let sug = this.state.sugestoes.shift();

          this.setState({
            nome_popular: sug.nome_popular,
            nome_cientifico: sug.nome_cientifico,
            fruto: sug.fruto,
            utilidade: sug.utilidade,
          })
          
        }
        else this.setState({temSugestao: false})
      })
      .catch(e => alert(e));
  }

  handleSugerirPress = async (option) => {
    this.setState({loading: true});
    await fetch('https://onodrim.herokuapp.com/checar', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({nome_cientifico: this.state.nome_cientifico, checado: option}),
    })
      .then(response => response.json())
      .then(response => {
        if (!Array.isArray(response)) {
          switch (option) {
            case 0: alert('Sugestão recusada com sucesso!'); break;
            case 2: alert('Sugestão aceita com sucesso!'); break;
          }

          const sug = this.state.sugestoes.shift();
          if(!sug)
            this.setState({temSugestao: false});
          else {
            this.setState({
              nome_cientifico: sug.nome_cientifico,
              nome_popular: sug.nome_popular,
              fruto: sug.fruto,
              utilidade: sug.utilidade,
            })
          };
        }
        else alert('Ocorreu um erro!');
        this.setState({ loading: false });
      })

  }

  render() {
    return (
      <Container>
        <StatusBar hidden />

        {!this.state.temSugestao &&
          <View>
            <ButtonBackText style={{width: 250}}>
              Não há nenhuma sugestão para ser avaliada no momento!
            </ButtonBackText>
          </View>
        }

        { this.state.temSugestao && 
          <View>
          <Input style={{width: 300}}
            placeholder="Nome"
            value={this.state.nome_popular}
            editable={false}
          />

          <Input style={{ width: 300 }}
            placeholder="Nome científico"
            value={this.state.nome_cientifico}
            editable={false}
          />

          <Input style={{ width: 300 }}
            placeholder="Fruto"
            value={this.state.fruto}
            editable={false}
          />

          <Input style={{ width: 300 }}
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
                { text: 'Sim', onPress: () => { this.handleSugerirPress(0) } },
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

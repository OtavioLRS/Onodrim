import styled from 'styled-components';
import { StyleSheet } from 'react-native';

const Container = styled.View`  
  flex: 1;
  alignItems: center;
  justifyContent: flex-start;
  backgroundColor: #78D561;
`;

const Input = styled.TextInput`
  paddingHorizontal: 20px;
  paddingVertical: 5px;
  borderRadius: 5px;
  backgroundColor: #FFF;
  alignSelf: stretch;
  marginBottom: 15px;
  marginHorizontal: 20px;
  fontSize: 16px;
`;

const ButtonCadastro = styled.TouchableHighlight`
  padding: 10px;
  marginTop: 20px;
  backgroundColor: #FFF;
  borderRadius: 5px;
`;

const ButtonCadastroText = styled.Text`
  color: #78D561;
  fontWeight: bold;
  fontSize: 20px;
  textAlign: center;
`;

const ButtonBack = styled.TouchableHighlight`
  padding: 10px;
  marginTop: 10px;
  backgroundColor: #78D561;
  borderRadius: 5px;
`;

const ButtonBackText = styled.Text`
  color: #FFF;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
`;

const ErrorMessage = styled.Text`
  textAlign: center;
  color: #CE2029;
  fontSize: 16px;
  marginBottom: 5px;
  marginHorizontal: 20px;
`;

const SuccessMessage = styled.Text`
  textAlign: center;
  color: #08a092;
  fontSize: 16px;
  marginBottom: 5px;
  marginHorizontal: 20px;
`;

const styles = StyleSheet.create({
  imagem: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5
  },
  picker: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    marginBottom: 15,
    marginHorizontal: 20,
    fontSize: 16,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { Container, Input, ButtonCadastro, ButtonCadastroText, ButtonBack, ButtonBackText, ErrorMessage, SuccessMessage, styles };
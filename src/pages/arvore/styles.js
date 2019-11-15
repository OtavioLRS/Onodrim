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

const styles = StyleSheet.create({
  imagem: { 
    width: 100, 
    height: 100,
    marginTop: 10,
    marginBottom: 30,
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
  }
});

export {Container, Input, styles};
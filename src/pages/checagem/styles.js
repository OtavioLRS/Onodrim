import styled from 'styled-components';
import { StyleSheet } from 'react-native';

const Container = styled.View`  
  flex: 1;
  alignItems: center;
  justifyContent: center;
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
  marginBottom: 15px;
  marginHorizontal: 20px;
`;

const SuccessMessage = styled.Text`
  textAlign: center;
  color: #08a092;
  fontSize: 16px;
  marginBottom: 15px;
  marginHorizontal: 20px;
`;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botao: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});

export { Container, Input, ButtonBack, ButtonBackText, ErrorMessage, SuccessMessage, styles };
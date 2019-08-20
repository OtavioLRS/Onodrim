import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  backgroundColor: #78D561;
`;

const Logo = styled.Image`
  height: 30%;
  marginBottom: 40px;
`;

const SuccessMessage = styled.Text`
  textAlign: center;
  color: #08a092;
  fontSize: 16px;
  marginBottom: 15px;
  marginHorizontal: 20px;
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

const ErrorMessage = styled.Text`
  textAlign: center;
  color: #CE2029;
  fontSize: 16px;
  marginBottom: 15px;
  marginHorizontal: 20px;
`;

const SignInLink = styled.TouchableHighlight`
  padding: 10px;
  marginTop: 20px;
  backgroundColor: #FFF;
  borderRadius: 5px;
`;

const SignInLinkText = styled.Text`
  color: #78D561;
  fontWeight: bold;
  fontSize: 20px;
  textAlign: center;
`;

const SignUpLink = styled.TouchableHighlight`
  padding: 10px;
  marginTop: 20px;
  backgroundColor: #78D561;
  borderRadius: 5px;
`;

const SignUpLinkText = styled.Text`
  color: #FFF;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
`;

export {
  Container,
  Logo,
  SuccessMessage,
  Input,
  ErrorMessage,
  SignUpLink,
  SignUpLinkText,
  SignInLink,
  SignInLinkText,
};

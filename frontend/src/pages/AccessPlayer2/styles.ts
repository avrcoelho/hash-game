import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Content = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const LogoContainer = styled.View``;

export const LogoText = styled.Text`
  color: #efefef;
  font-family: 'Permanent Marker';
  font-size: 30px;
  text-align: center;
`;

export const FormContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  height: 200px;
  width: 300px;
`;

export const Loader = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#312e38',
})``;

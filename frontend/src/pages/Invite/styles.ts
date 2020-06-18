import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const LogoText = styled.Text`
  color: #efefef;
  font-family: 'Permanent Marker';
  font-size: 30px;
  text-align: center;
`;

export const Info = styled.Text`
  color: #efefef;
  font-size: 14px;
  text-align: center;
  width: 200px;
  margin: 20px 0;
`;

export const LinkContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Link = styled.Text`
  color: #efefef;
  font-size: 14px;
`;

export const CopyButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 30px;
  width: 30px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: 15px;
  border-color: #efefef;
  margin-left: 10px;
`;

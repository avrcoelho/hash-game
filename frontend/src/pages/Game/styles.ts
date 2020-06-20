import styled from 'styled-components/native';
import { FlatList } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  height: 100vh;
`;

export const Header = styled.View`
  width: 400px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 40px;
`;

export const Player = styled.Text`
  font-size: 20px;
  background: #efefef;
  padding: 2px 8px;
  border-radius: 4px;
`;

export const Turn = styled.Text`
  color: #efefef;
  font-size: 16px;
`;

export const GameList = styled(FlatList as new () => FlatList<number>)`
  padding: 32px 24px 16px;
`;

export const Loader = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#efefef',
})`
  margin-top: 40px;
`;

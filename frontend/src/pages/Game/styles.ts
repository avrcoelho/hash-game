import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { GameData } from '../../hooks/types';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  height: 100vh;
`;

export const GameList = styled(FlatList as new () => FlatList<GameData>)`
  padding: 32px 24px 16px;
`;

export const Loader = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#efefef',
})`
  margin-top: 40px;
`;

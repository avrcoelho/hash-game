import styled from 'styled-components/native';

interface PlayerProps {
  winner: boolean;
}

export const Container = styled.View`
  width: 400px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 40px;
`;

export const Player = styled.Text<PlayerProps>`
  font-size: 20px;
  background: ${props => (props.winner ? '#53c100' : '#efefef')};
  color: #312e38;
  padding: 2px 8px;
  border-radius: 4px;
`;

export const Turn = styled.Text`
  color: #efefef;
  font-size: 16px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
`;

export const ButtonPlayAgain = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: transparent;
  height: 32px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  border-width: 1px;
  border-color: #efefef;
`;

export const ButtonPlayAgainText = styled.Text`
  color: #efefef;
  font-size: 14px;
  line-height: 0;
`;

export const ButtonClose = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: #c53030;
  height: 32px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  margin-left: 8px;
`;

export const ButtonCloseText = styled.Text`
  color: #efefef;
  font-size: 14px;
  line-height: 0;
`;

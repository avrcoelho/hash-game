import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import Header from '../';
import { HashData } from '../../../../hooks/types';

jest.mock(
  'react-native/Libraries/Components/Touchable/TouchableOpacity.js',
  () => {
    const { TouchableHighlight } = require('react-native');
    const MockTouchable = (props: any) => {
      return <TouchableHighlight {...props} />;
    };
    MockTouchable.displayName = 'TouchableOpacity';

    return MockTouchable;
  },
);

interface Props {
  id: string;
  playAgainGame(id: string): Promise<void>;
  closeGame(id: string): Promise<void>;
  hash: HashData;
}

describe('Header Game', () => {
  const props = {
    hash: {
      game: [
        {
          position: 1,
          player: 'johndoe',
          type: 'x',
        },
      ],
      player_1: 'johndoe',
      player_2: 'johntree',
      id: '123',
      nextPlayer: 'johntree',
      playerInit: null,
      you: 'johntree',
      winningMode: [1, 2, 3],
      winner: 'johntree',
    },
    id: '123456',
    playAgainGame: jest.fn(),
    closeGame: jest.fn(),
  } as Props;

  it('should be able to winner and players name', async () => {
    const { queryByTestId, getByText } = render(<Header {...props} />);

    expect(queryByTestId('turn')).toBeFalsy();
    expect(getByText('johndoe')).toBeTruthy();
    expect(getByText('johntree')).toBeTruthy();
  });

  it('should be able to play again', async () => {
    const { getByText } = render(<Header {...props} />);

    fireEvent.press(getByText('Jogar novamente'));

    expect(props.playAgainGame).toHaveBeenCalledWith('123456');
  });

  it('should be able to close game', async () => {
    const { getByText } = render(<Header {...props} />);

    fireEvent.press(getByText('Sair'));

    expect(props.closeGame).toHaveBeenCalledWith('123456');
  });

  it('should be able to close game', async () => {
    props.hash = {
      game: [
        {
          position: 1,
          player: 'johndoe',
          type: 'x',
        },
      ],
      player_1: 'johndoe',
      player_2: 'johntree',
      id: '123',
      nextPlayer: 'johntree',
      playerInit: null,
      you: 'johntree',
      winner: 'johntree',
    };

    const { queryByTestId } = render(<Header {...props} />);

    expect(queryByTestId('turn')).toBeTruthy();
    expect(queryByTestId('buttons')).toBeFalsy();
  });
});

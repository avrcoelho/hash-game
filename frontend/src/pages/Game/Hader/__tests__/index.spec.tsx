import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import Header from '../';

const mockedCloseGame = jest.fn();
const mockedPlayAgain = jest.fn();
const mockedHash = jest.fn().mockReturnValue(undefined);

jest.mock('../../../../hooks/integration', () => {
  return {
    useIntegration: () => ({
      playAgainGame: mockedPlayAgain,
      closeGame: mockedCloseGame,
      hash: mockedHash(),
    }),
  };
});

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

describe('Header Game', () => {
  it('should be able to winner and players name', async () => {
    mockedHash.mockReturnValue({
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
    });

    const { queryByTestId, getByText } = render(<Header id="123456" />);

    expect(queryByTestId('turn')).toBeFalsy();
    expect(getByText('johndoe')).toBeTruthy();
    expect(getByText('johntree')).toBeTruthy();
  });

  it('should be able to play again', async () => {
    mockedHash.mockReturnValue({
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
    });

    const { getByText } = render(<Header id="123456" />);

    fireEvent.press(getByText('Jogar novamente'));

    expect(mockedPlayAgain).toHaveBeenCalledWith('123456');
  });

  it('should be able to close game', async () => {
    mockedHash.mockReturnValue({
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
    });

    const { getByText } = render(<Header id="123456" />);

    fireEvent.press(getByText('Sair'));

    expect(mockedCloseGame).toHaveBeenCalledWith('123456');
  });

  it('should be able to close game', async () => {
    mockedHash.mockReturnValue({
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
    });

    const { queryByTestId } = render(<Header id="123456" />);

    expect(queryByTestId('turn')).toBeTruthy();
    expect(queryByTestId('buttons')).toBeFalsy();
  });
});

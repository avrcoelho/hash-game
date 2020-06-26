import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import Game from '../';

const mockedShowGame = jest.fn();
const mockedMoveGame = jest.fn();
const mockedUpdateData = jest.fn();
const mockedHistoryPush = jest.fn();
const mockedCloseGame = jest.fn();
const mockedPlayAgain = jest.fn();
const mockedHash = jest.fn().mockReturnValue(undefined);

jest.mock('react-router-dom', () => {
  return {
    useParams: () => ({
      id: '123',
    }),
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
  };
});

jest.mock('../../../hooks/integration', () => {
  return {
    useIntegration: () => ({
      showGame: mockedShowGame,
      moveGame: mockedMoveGame,
      updateData: mockedUpdateData,
      playAgainGame: mockedPlayAgain,
      closeGame: mockedCloseGame,
      hash: mockedHash(),
      loadingMove: false,
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

describe('Game', () => {
  it('should be able render loader element', () => {
    const { queryByTestId } = render(<Game />);

    expect(queryByTestId('loader')).toBeTruthy();
  });

  it('should be able render 9 elements in list', () => {
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
      you: 'johndoe',
    });

    const { getAllByTestId } = render(<Game />);

    expect(getAllByTestId('item-game').length).toBe(9);
  });

  it('should be able press position', async () => {
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
    });

    const { getAllByTestId } = render(<Game />);

    fireEvent.press(getAllByTestId('item-game')[0]);

    expect(mockedMoveGame).toHaveBeenCalledWith({ id: '123', position: 1 });
  });

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

    const { queryByTestId, getByText } = render(<Game />);

    expect(queryByTestId('turn')).toBeFalsy();
    expect(getByText('johndoe')).toBeTruthy();
    expect(getByText('johntree')).toBeTruthy();
  });
});

import React from 'react';
import { render, fireEvent, wait, act } from '@testing-library/react-native';

import Access from '../';

const mockedHistoryPush = jest.fn();
const mockedInitGame = jest.fn();
const mockedHash = jest.fn();

mockedHash.mockImplementation(() => ({}));

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

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
  };
});

jest.mock('../../../hooks/integration', () => {
  return {
    useIntegration: () => ({
      initGame: mockedInitGame,
      loading: false,
      hash: mockedHash(),
    }),
  };
});

describe('Access', () => {
  it('should be able to show error when invalid input', async () => {
    const { getByTestId } = render(<Access />);

    fireEvent.press(getByTestId('button'));

    await wait(() => expect(mockedInitGame).not.toHaveBeenCalled());
  });

  it('should be able fetch playe 1', async () => {
    const { getByTestId } = render(<Access />);

    await act(async () => {
      fireEvent.changeText(getByTestId(`input-player_1`), 'tester');
      fireEvent.press(getByTestId('button'));
    });

    await wait(() => {
      expect(mockedInitGame).toHaveBeenCalledWith({
        player_1: 'tester',
      });
    });
  });
});

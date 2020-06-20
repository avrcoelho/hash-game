import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react-native';

import Invite from '../';

const mockedHistoryPush = jest.fn();
const mockedShowGame = jest.fn();
const mockedClickboard = jest.fn();

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
    useParams: () => ({
      id: '123',
    }),
  };
});

jest.mock('@react-native-community/hooks', () => {
  return {
    useClipboard: () => ['', mockedClickboard],
  };
});

jest.mock('../../../hooks/integration', () => {
  return {
    useIntegration: () => ({
      showGame: mockedShowGame,
      error: false,
    }),
  };
});

describe('Invite page', () => {
  it('should be able to click button copy to clipboard', () => {
    const { getByText, getByTestId } = render(<Invite />);

    expect(getByText('http://localhost:3000/player2/123')).toBeTruthy();

    fireEvent.press(getByTestId('button-copy'));

    expect(mockedClickboard).toHaveBeenCalledWith(
      'http://localhost:3000/player2/123',
    );
  });
});

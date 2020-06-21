import React from 'react';
import { render, fireEvent, wait, act } from '@testing-library/react-native';

import AccessPlayer2 from '../';

const mockedInsertPlay2 = jest.fn().mockReturnValue('123');

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
    useParams: () => ({
      id: '123',
    }),
  };
});

jest.mock('../../../hooks/integration', () => {
  return {
    useIntegration: () => ({
      insertPlay2: mockedInsertPlay2,
      loading: false,
      error: false,
    }),
  };
});

describe('AccessPlayer2', () => {
  it('should be able to show error when invalid input', async () => {
    const { getByTestId } = render(<AccessPlayer2 />);

    fireEvent.press(getByTestId('button'));

    await wait(() => expect(mockedInsertPlay2).not.toHaveBeenCalled());
  });

  it('should be able fetch playe 2', async () => {
    const { getByTestId } = render(<AccessPlayer2 />);

    await act(async () => {
      fireEvent.changeText(getByTestId(`input-player_2`), 'tester');
      fireEvent.press(getByTestId('button'));
    });

    await wait(() => {
      expect(mockedInsertPlay2).toHaveBeenCalledWith({
        player_2: 'tester',
        id: '123',
      });
    });
  });
});

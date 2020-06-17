import React from 'react';
import { render, fireEvent, wait, act } from '@testing-library/react-native';
import axios from 'axios';

import Access from '../';
import AppProvider from '../../../hooks';

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

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Access', () => {
  it('should be able to show error when invalid input', async () => {
    const { queryByTestId, getByTestId } = render(
      <AppProvider>
        <Access />
      </AppProvider>,
    );

    fireEvent.press(getByTestId('button'));

    await wait(() => expect(queryByTestId(/input-error/)).toBeTruthy());
  });

  it('should be able fetch playe 1', async () => {
    const responseData = {
      hash: {
        game: [],
        player_1: 'teste',
        created_at: '2020-06-16T23:19:09.322Z',
        updated_at: '2020-06-16T23:19:09.322Z',
        id: '5ee9536d5c5d450d49bd1954',
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTIzNDk1NDksImV4cCI6MTU5MjQzNTk0OSwic3ViIjoidGVzdGUifQ.7jNU-5tc-6mVQ7iO0_WOh8KZfHlVHUIbJpYuToSwGQk',
    };

    mockedAxios.post.mockResolvedValueOnce({ data: responseData });

    const { getByTestId } = render(
      <AppProvider>
        <Access />
      </AppProvider>,
    );

    await act(async () => {
      fireEvent.changeText(getByTestId(`input-player_1`), 'tester');
      fireEvent.press(getByTestId('button'));
    });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(mockedAxios.post).toHaveBeenCalledWith('hash', {
      player_1: 'tester',
    });
  });
});

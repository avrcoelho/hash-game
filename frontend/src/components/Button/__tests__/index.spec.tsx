import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Button from '..';

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

describe('Button', () => {
  it('should be able to render button and props', () => {
    const props = {
      onPress: jest.fn(),
    };

    const { getByText, getByTestId } = render(<Button {...props}>Test</Button>);

    expect(getByText('Test')).toBeTruthy();

    fireEvent.press(getByTestId('button'));

    expect(props.onPress).toHaveBeenCalled();
  });
});

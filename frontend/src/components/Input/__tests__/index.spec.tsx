import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FiUser } from 'react-icons/fi';
import '@testing-library/jest-native/extend-expect';

import Input from '..';

const mockedError = jest.fn();

mockedError.mockImplementation(() => undefined);

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: mockedError(),
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input', () => {
  const props = {
    icon: FiUser,
    name: 'player',
    placeholder: 'Player name',
  };

  it('should be able to render input and props', () => {
    const { getByPlaceholderText, queryByTestId } = render(
      <Input {...props} />,
    );

    expect(getByPlaceholderText(props.placeholder)).toBeTruthy();
    expect(queryByTestId('input-error')).toBeFalsy();
  });

  it('should be able to border when focused input', () => {
    const { getByTestId } = render(<Input {...props} />);

    fireEvent.focus(getByTestId(`input-${props.name}`));

    expect(getByTestId('input-container')).toHaveStyle({
      borderColor: '#efefef',
    });

    fireEvent.blur(getByTestId(`input-${props.name}`));

    expect(getByTestId('input-container')).not.toHaveStyle({
      borderColor: '#efefef',
    });
  });

  it('should be able to color when filled input', () => {
    const { getByTestId } = render(<Input {...props} />);

    fireEvent.changeText(getByTestId(`input-${props.name}`), 'tester');
    fireEvent.blur(getByTestId(`input-${props.name}`));

    expect(getByTestId('input-container')).toHaveStyle({
      color: '#efefef',
    });

    fireEvent.changeText(getByTestId(`input-${props.name}`), '');
    fireEvent.blur(getByTestId(`input-${props.name}`));

    expect(getByTestId('input-container')).not.toHaveStyle({
      color: '#efefef',
    });
  });

  it('should be able to render error', () => {
    mockedError.mockImplementation(() => 'Invalid input');

    const { getByText } = render(<Input {...props} />);

    expect(getByText('Invalid input')).toBeTruthy();
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FiUser } from 'react-icons/fi';
import { Form } from '@unform/mobile';
import '@testing-library/jest-native/extend-expect';

import Input from '..';

describe('Input', () => {
  const props = {
    icon: FiUser,
    name: 'player',
    placeholder: 'Player name',
  };

  it('should be able to render input and props', () => {
    const { getByPlaceholderText } = render(
      <Form onSubmit={() => {}}>
        <Input {...props} />
      </Form>,
    );

    expect(getByPlaceholderText(props.placeholder)).toBeTruthy();
  });

  it('should be able to border when focused input', () => {
    const { getByTestId } = render(
      <Form onSubmit={() => {}}>
        <Input {...props} />
      </Form>,
    );

    fireEvent.focus(getByTestId(`input-${props.name}`));

    expect(getByTestId('input-container')).toHaveStyle({
      borderColor: '#ffd21f',
    });

    fireEvent.blur(getByTestId(`input-${props.name}`));

    expect(getByTestId('input-container')).not.toHaveStyle({
      borderColor: '#ffd21f',
    });
  });

  it('should be able to color when filled input', () => {
    const { getByTestId } = render(
      <Form onSubmit={() => {}}>
        <Input {...props} />
      </Form>,
    );

    fireEvent.changeText(getByTestId(`input-${props.name}`), 'tester');
    fireEvent.blur(getByTestId(`input-${props.name}`));

    expect(getByTestId('input-container')).toHaveStyle({
      color: '#ffd21f',
    });

    fireEvent.changeText(getByTestId(`input-${props.name}`), '');
    fireEvent.blur(getByTestId(`input-${props.name}`));

    expect(getByTestId('input-container')).not.toHaveStyle({
      color: '#ffd21f',
    });
  });
});

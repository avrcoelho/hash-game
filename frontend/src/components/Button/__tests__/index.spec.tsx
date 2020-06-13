import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button from '..';

describe('Button', () => {
  it('should be able to render button and props', () => {
    const props = {
      onClick: jest.fn(),
    };

    const { getByText, getByTestId } = render(<Button {...props}>Test</Button>);

    expect(getByTestId('button-text')).toContainElement(getByText('Test'));

    fireEvent.click(getByTestId('button'));

    expect(props.onClick).toHaveBeenCalled();
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import ItemGame from '..';

describe('ItemGame', () => {
  it('should be able to don`t render icon', () => {
    const { getByTestId } = render(
      <ItemGame
        positionWinner={false}
        isMobileSmall={false}
        isMobileMedium={false}
      ></ItemGame>,
    );

    expect(getByTestId('item-game').children.length).toBe(0);
  });

  it('should be able to render icon x', () => {
    const { getByTestId } = render(
      <ItemGame
        positionWinner={false}
        isMobileSmall={false}
        isMobileMedium={false}
      >
        x
      </ItemGame>,
    );

    expect(getByTestId('item-game').children.length).toBe(1);
  });

  it('should be able to render icon o', () => {
    const { getByTestId } = render(
      <ItemGame
        positionWinner={false}
        isMobileSmall={false}
        isMobileMedium={false}
      >
        o
      </ItemGame>,
    );

    expect(getByTestId('item-game').children.length).toBe(1);
  });
});

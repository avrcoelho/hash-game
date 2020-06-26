import React, { useMemo } from 'react';
import { TouchableOpacityProperties } from 'react-native';
import { FiX, FiCircle } from 'react-icons/fi';

import { Container } from './styles';

interface Props extends TouchableOpacityProperties {
  positionWinner: boolean;
  isMobileMedium: boolean;
  isMobileSmall: boolean;
}

const ItemGame: React.FC<Props> = ({
  positionWinner,
  isMobileMedium,
  isMobileSmall,
  children,
  ...rest
}) => {
  const element = useMemo<React.ReactNode | null>(() => {
    switch (children) {
      case 'x':
        return (
          <FiX size={250} color={positionWinner ? '#53c100' : '#312E38'} />
        );
      case 'o':
        return (
          <FiCircle size={140} color={positionWinner ? '#53c100' : '#312E38'} />
        );
      default:
        return null;
    }
  }, [children, positionWinner]);

  console.log(isMobileMedium);
  return (
    <Container
      isO={!!(children === 'o')}
      isMobileSmall={isMobileSmall}
      isMobileMedium={isMobileMedium}
      testID="item-game"
      {...rest}
    >
      {element}
    </Container>
  );
};

export default ItemGame;

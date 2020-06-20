import React from 'react';
import { TouchableOpacityProperties } from 'react-native';

import { Container, Text } from './styles';

const ItemGame: React.FC<TouchableOpacityProperties> = ({
  children,
  ...rest
}) => (
  <Container {...rest}>
    <Text>{children}</Text>
  </Container>
);

export default ItemGame;

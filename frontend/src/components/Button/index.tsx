import React from 'react';
import { TouchableOpacityProperties } from 'react-native';

import { Container, ButtonText } from './styles';

const Button: React.FC<TouchableOpacityProperties> = ({
  children,
  ...rest
}) => {
  return (
    <Container activeOpacity={0.7} {...rest} testID="button">
      <ButtonText testID="button-text">{children}</ButtonText>
    </Container>
  );
};

export default Button;

import React from 'react';
import { TouchableOpacityProperties } from 'react-native';

import { Container, ButtonText } from './styles';

interface ButtonProps extends TouchableOpacityProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container activeOpacity={0.7} {...rest} testID="button">
      <ButtonText testID="button-text">{children}</ButtonText>
    </Container>
  );
};

export default Button;

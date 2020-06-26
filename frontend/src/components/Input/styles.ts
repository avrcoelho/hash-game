import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  isFilled: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  border-width: 2px;
  border-color: #737373;
  background-color: #0f204e;
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  color: #737373;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
      color: #c53030;
      margin-bottom: 3px;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #efefef;
      border-color: #efefef;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #efefef;
    `}

  svg {
    margin-right: 16px;
  }
`;

export const TextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  font-size: 16px;
  padding-left: 8px;
  color: #f4ede8;
`;

export const Error = styled.Text`
  color: #c53030;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: bold;
`;

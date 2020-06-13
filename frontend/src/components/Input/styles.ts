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
  border-color: #232129;
  background-color: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  color: #666360;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #ffd21f;
      border-color: #ffd21f;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #ffd21f;
    `}

  svg {
    margin-right: 16px;
  }
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  padding-left: 8px;
  color: #f4ede8;
`;

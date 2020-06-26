import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isMobileMedium: boolean;
  isO: boolean;
  isMobileSmall: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  height: 200px;
  width: 200px;
  border-radius: 4px;
  background: #efefef;
  margin: 4px;
  align-items: center;
  justify-content: center;
  padding: ${props => (props.isO ? '20px' : 0)};

  ${props =>
    props.isMobileMedium &&
    css`
      height: 150px;
      width: 150px;
    `}
  ${props =>
    props.isMobileSmall &&
    css`
      height: 100px;
      width: 100px;
      padding: ${props.isO ? '14px' : 0};
    `};
`;

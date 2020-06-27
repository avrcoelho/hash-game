import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #0f204e;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: sans-serif;
    font-size: 16px;
  }

  h1,h2,h3,h4,h5,h5, strong{
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;

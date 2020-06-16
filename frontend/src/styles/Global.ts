import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #312E38;
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

  .spin {
    animation: spin 2s infinite linear;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;

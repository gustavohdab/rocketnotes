import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;

    font-family: 'Roboto Slab', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    color: ${({ theme }) => theme.COLORS.WHITE};

  }

  a {
    text-decoration: none;
  }

  button, a {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  button:hover, a:hover {
    filter: brightness(0.9);
  }
`;
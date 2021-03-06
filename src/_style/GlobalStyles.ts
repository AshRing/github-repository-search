import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      font-size: 1em;
      font-family: 'Roboto', sans-serif;
      letter-spacing: .32px;
      box-sizing: border-box;
    }
    
    html {
      font-size: 16px;
    }

    a {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      border-radius: .25rem;
      cursor: pointer;
      transition: .2s ease all;
      background: none;
    }

    h1 {
      font-size: 1.5rem;
      font-weight: bold;
    }

    h2 {
      font-size: 1.25rem;
      font-weight: bold;
    }

    h3 {
      font-size: 1rem;
      font-weight: bold;
    }
`;

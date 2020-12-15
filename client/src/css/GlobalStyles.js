import { createGlobalStyle } from 'styled-components';
import waterfall from '../images/wallpaper.jpg';
export const GlobalStyles = createGlobalStyle`

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

h1,
h2,
h3 {
  font-family: 'Poppins', sans-serif;
}

body {
    position: relative;
    background: url(${waterfall});
    background-attachment: fixed;
    background-size: cover;
    color: ${({ theme }) => theme.text};
    font-family: Montserrat, Tahoma, Helvetica, Arial, Roboto, sans-serif;
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top:0;
      left:0;
      background-color: ${({ theme }) => theme.bg};
      transition: background-color 500ms linear;
     z-index: -5;
    }
  }
  
  `;

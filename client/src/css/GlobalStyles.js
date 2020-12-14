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
  
  .toggle {
    --width: 40px;
    --height: calc(var(--width) / 2);
    --border-radius: calc(var(--height) / 2);

    display: inline-block;
    cursor: pointer;
}
.toggle__input {
    display: none;
}
.toggle__fill {
    position: relative;
    width: var(--width);
    height: var(--height);
    border-radius: var(--border-radius);
    background: #dddddd;
    transition: background 0.2s;
}
.toggle__fill::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: var(--height);
    width: var(--height);
    background: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    border-radius: var(--border-radius);
    transition: transform 0.2s;
}
.toggle__input:checked ~ .toggle__fill {
    background: #009578;
}

.toggle__input:checked ~ .toggle__fill::after {
    transform: translateX(var(--height));
}
  `;

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-image: linear-gradient(to right, ${({ theme }) => [theme.lightBackground, theme.darkBackground].join(', ')});
  }

  /* Remove arrows in number field */
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Remove arrows in number field */
  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  /* Remove blue border around input */
  input:focus, select:focus, option:focus {
    outline: none;
  }

  /* Change color of placeholder */
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${({ theme }) => theme.fontColor};
    opacity: 0.5; /* Firefox */
    font-size: 1rem;
    text-align: right;
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: ${({ theme }) => theme.fontColor};
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: ${({ theme }) => theme.fontColor};
  }

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.lightVersion};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.darkBackground};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.darkBackground};
  }
`

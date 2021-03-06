import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Open Sans Condensed';
        padding: 20px 60px;

        @media screen and (max-width:800px) {
            padding: 10px;
        }
    }

    a{
        text-decoration: none;
        color: black;
    }

    *{
        /* This to align the border box of signin button and input forms, which is shifted abit because of padding*/
        box-sizing: border-box;
    }
`;

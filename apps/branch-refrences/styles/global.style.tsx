import { createGlobalStyle } from 'styled-components';
import { Direction } from '@branch-services/types';
import { cssVar, respondTo } from '@branch-services/utils';
import '../public/fonts/font.css';

const GlobalStyle = createGlobalStyle<any>`
  :root {
    ${cssVar.appBarHeight}: 6.4rem;
    ${cssVar.drawerWidth}: 33.6rem;
    ${cssVar.drawerClosedWidth}: 9.6rem;
    ${cssVar.mainContentMargin}: var(${cssVar.drawerWidth});
    ${cssVar.drawerSideGap}: 3.2rem;
    ${cssVar.verticalGap}: 1.2rem;
    ${cssVar.radius}: 0.8rem;
    ${cssVar.appbarZIndex}: 1000;

  }

  ${respondTo.down('md')} {
    :root {
      ${cssVar.appBarHeight}: 6.4rem;
      ${cssVar.mainContentMargin}: 0;

    }
  }

  ${respondTo.down('xl')} {
    :root {
      ${cssVar.drawerSideGap}: 3.2rem;
    }
  }

  ${respondTo.down('lg')} {
    :root {
      ${cssVar.drawerSideGap}: 2.4rem;
    }
  }


  @media only screen and (min-width: 150em) {
    :root {
      ${cssVar.drawerSideGap}: 10vw;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  *::-webkit-scrollbar {
    width: 6px;
    height: 1.2rem;
  }

  *::-webkit-scrollbar-track {
    background: ${(props) => props.theme.background};
  }

  *::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.border};
      //box-shadow: inset 0 0 0 0.4rem ${(props) => props.theme.background};
  }

  * {
    scrollbar-width: thin;
  }

  html {
    font-size: 62.5%; // font-size = 10px; 1rem = 10px, 10px/16px = 62.5% or 10px is 0.625em
    box-sizing: border-box;

    ${respondTo.down('md')} {
      font-size: 50%; //  font-size = 8px; 50% of 1em [1em = 16px]
    }
  }

  body {
    padding: 0;
    margin: 0;
    font-family: ${(props) => (props.theme.direction === Direction.RTL ? 'iransans' : 'Tahoma')}, sans-serif;
    font-size: 1.4rem;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.textPrimary};
    /*! @noflip */
    direction: ${(props) => (props.theme.direction === Direction.RTL ? Direction.RTL : Direction.LTR)};
  }

  html body {
    /* modal issue */
    //overflow-y: auto !important;
    width: 100% !important;
  }

  .ant-picker-input > input, .ant-picker-header * {
    font-family: inherit;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-text-fill-color: ${(props) => props.theme.textPrimary} !important;
    //background-color: #d92525 !important;
    //transition: background-color 5000s ease-in-out 0s;
    -webkit-box-shadow: 0 0 0 50px ${(props) =>
      props.theme.surface} inset !important; /* Change the color to your own background color */

  }

  .ant-modal-confirm-content {
    display: flex;
    width: 100%;
  }

  .anticon {
    color: ${(props) => props.theme.iconPrimary};
  }

  .ant-form-large .ant-form-item .ant-form-item-label > label {
    height: auto;
    font-weight: 500;
  }

  .ant-form-item-explain {
    font-size: 1.2rem !important;
    //margin-bottom: 1rem;
  }

  .ri-2x {
    font-size: 2rem;
  }

  .ant-select-dropdown .ant-select-item{ 
    font-size: 1.4rem;
    ${respondTo.down('md')}{
      font-size: 1.5rem;
    }
    &.ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      background-color:  ${(p) => p.theme.primaryLight};
      color: ${(p) => p.theme.primary};
    }
  }

  .ant-notification {
    font-family: inherit;

    & .ant-notification-notice-wrapper {
      background: ${(props) => props.theme.surface};
      border-radius: 10px;

      & .ant-notification-notice {
        color: ${(props) => props.theme.textPrimary};
        padding: 2rem 1.6rem;
        font-family: inherit;

        & .ant-notification-notice-content {
          margin-right: 2rem;
        }

        & .ant-notification-notice-message, & .ant-notification-notice-description {
          color: inherit;
        }

        & .ant-notification-notice-close {
          inset-inline-end: 1.6rem;
        }
      }
    }
  }
`;
export default GlobalStyle;

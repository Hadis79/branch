import styled, { css } from 'styled-components';
import { Layout, Switch as AntSwitch, Dropdown as AntDropdown } from 'antd';
import { cssVar, respondTo } from '@branch-services/utils';

const { Header } = Layout;

export const AppBar = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  margin: 1.6rem;
  border-radius: var(--radius);
  position: sticky;
  height: var(${cssVar.appBarHeight});
  top: 0;
  left: 0;
  padding: 2rem 4rem;
  z-index: var(${cssVar.appbarZIndex});
  color: ${(p) => p.theme.onPrimary};
  background-color: ${(p) => p.theme.appbar};
  line-height: 1.5;

  span[role='img'] {
    font-size: 2.4rem;
  }

  ${respondTo.down('md')} {
    // display: inline-flex;
    // margin: 1rem;
    justify-content: space-between;
    padding: 2rem 2rem;
  }

  .menu-toggle-wrapper {
    display: none;
    font-size: 3rem;
    color: ${(p) => p.theme.onPrimary};

    &:hover {
      color: ${(p) => p.theme.onPrimary} !important;
    }

    ${respondTo.down('md')} {
      display: inline-flex;
      margin: 1rem;
    }
  }

  .tools {
    display: flex;
    align-items: center;
  }

  .appbar-title-logo-date {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    gap: 4rem;
    font-weight: normal;
    color: ${(p) => p.theme.textPrimary} !important;

    svg {
      /* width: 4.8rem;
      height: 4.8rem; */
      /* margin-right: 1.3rem; */
    }
  }

  .appbar-title-bank-logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1;

    img {
      width: 15rem;
      height: 3.2rem;
      object-fit: scale-down;
    }
  }

  .appbar-item {
    margin-left: 1.6rem;
    color: ${(p) => p.theme.onPrimary};
    //width: 2.4rem;
    //height: 2.4rem;
    button {
      color: inherit !important;
      font-size: 2.4rem !important;
      line-height: 0;
    }
  }

  .appbar-item:last-child {
    //margin-right: 3.2rem;
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 100%;
  margin-left: 1.6rem;
  background-color: ${(p) => p.theme.onPrimary};
`;

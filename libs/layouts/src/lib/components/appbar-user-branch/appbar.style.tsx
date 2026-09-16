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
  background-color: ${(p) => p.theme.surface};
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

  .ant-select-arrow {
    height: 1.2rem !important;
    .ant-select-suffix {
      height: 1.2rem;
      width: 1.2rem;
    }
  }

  .tools {
    display: flex;
    align-items: center;
    .organization {
      .ant-select-arrow {
        .span {
          height: 1.2rem !important;
        }
      }
    }
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

export const Container = styled.div`
  padding: 1.6rem;
`;

export const Title = styled.h3`
  margin-bottom: 1.6rem;
  font-weight: 600;
  font-size: 1.6rem;
  color: ${(p) => p.theme.textPrimary};
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

export const Item = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  height: 5rem;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  background-color: transparent;

  ${(p) =>
    p.$active &&
    css`
      background-color: rgba(0, 150, 136, 0.08);
      border-color: #009688;
    `}
`;

export const Label = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(p) => p.theme.textPrimary};
`;

export const Radio = styled.span<{ $active?: boolean }>`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  box-sizing: border-box;
  border: 0.25rem solid #bbb;
  background-color: transparent;

  ${(p) =>
    p.$active &&
    css`
      border: 6px solid #009688;
      background-color: ${(p) => p.theme.textPrimary};
    `}
`;

export const Footer = styled.div`
  display: flex;
  gap: 1rem;

  button {
    height: 5rem;
    font-weight: 600;
  }
`;

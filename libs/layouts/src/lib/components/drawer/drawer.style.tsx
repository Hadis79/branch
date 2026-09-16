import { cssVar, getRelatedColor, hideScrollbar, respondTo } from '@branch-services/utils';
import { Drawer as AntDrawer, Layout } from 'antd';

import styled from 'styled-components';

const { Sider: AntSider } = Layout;

export const Sider = styled(AntSider)<{ direction: string; showSider?: boolean }>`
  /* overflow: auto; */
  height: 100vh;
  margin-top: 1.6rem;
  width: ${({ showSider }) => (showSider ? 'var(--drawer-width)' : '9.6rem')} !important;
  transition: width 0.2s ease-in-out;
  will-change: width;
  max-width: inherit !important;
  min-width: inherit !important;
  flex: 0 0 auto !important;
  position: sticky;
  top: 1.6rem;
  /* position: fixed !important; */
  /* top: calc(var(${cssVar.appBarHeight}) + var(${cssVar.verticalGap}));
  left: var(${cssVar.drawerSideGap});
  bottom: 0; */
  /* background: transparent !important; */
`;

export const Drawer = styled(AntDrawer)`
  & .ant-drawer-body {
    ${respondTo.down('md')} {
      padding: 2rem !important;
    }
  }
  &.ant-drawer-content {
    background: ${(p) => p.theme.surface};
  }
`;

export const MenuWrapper = styled.div<{ showSider?: boolean }>`
  overflow-y: auto;
  margin-bottom: var(${cssVar.verticalGap});
  background: ${(p) => p.theme.surface};
  height: 100%;
  border-radius: 0 0 var(${cssVar.radius}) var(${cssVar.radius});
  padding: 0 1.6rem;

  ${respondTo.down('md')} {
    padding: 1rem 0;
  }
  .menu-search-input-container {
    width: 100%;
    text-align: center;
    display: inline-block;
    vertical-align: bottom;
    /* margin-top: 2.4rem; */
    margin-bottom: 2.4rem;
    transition: all 0.15s ease;

    .ant-input-affix-wrapper {
      border-radius: 0.8rem;
    }
    input {
      ::placeholder {
        color: #414242cc;
      }
    }
    i {
      font-size: 2.2rem;
      margin-left: 0.4rem;
      color: #414242cc;
    }

    &.search-hide {
      margin-bottom: 0;
      border-radius: var(--radius);
      padding: 0.8rem 0.8rem 0.4rem;
      cursor: pointer;
      &:hover {
        background-color: ${(p) => p.theme.primaryLight};
      }
    }
  }

  ul.ant-menu-root {
    background-color: transparent;
    border-inline-end: none !important;
    color: ${(p) => p.theme.textSecondary};

    li.ant-menu-item-selected {
      background-color: ${(p) => p.theme.primaryLight};
      color: ${(p) => getRelatedColor(p.theme.id, p.theme.primary, p.theme.textPrimary)};
    }

    li.ant-menu-item,
    li.ant-menu-submenu {
      width: 100%;
      margin: 1rem auto;
      text-wrap: unset;
      line-height: 1.5;
    }
    li.ant-menu-submenu .ant-menu-submenu-title {
      width: 100%;
      margin: 0 2rem 0 0 !important;
    }
    li.ant-menu-submenu .ant-menu-submenu-title:hover {
      background-color: ${(p) => p.theme.primaryLight};
      color: ${(p) => p.theme.primary};
    }
    li.ant-menu-submenu .ant-menu-sub,
    .ant-menu-submenu-arrow {
      opacity: ${(p) => (p.showSider ? 1 : 0)};
    }
    li.ant-menu-item:not(.ant-menu-item-selected):hover {
      background-color: ${(p) => p.theme.primaryLight};
      color: ${(p) => p.theme.primary};
    }

    li.ant-menu-item i {
      font-size: 2.2rem;
    }
    .ant-menu-sub.ant-menu-inline {
      background: ${(p) => !p.showSider && 'transparent'};
    }

    div[role='menuitem'] i {
      font-size: 2.4rem;
    }

    .ant-menu-title-content {
      font-size: 1.4rem;
      font-weight: 500;
      opacity: ${(prop) => (prop.showSider ? 1 : 0)};
      transition: opacity 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & :hover {
        color: ${(p) => p.theme.textHoverColor};
      }

      .menu-item-badge {
        color: white;

        .ant-badge-count {
          color: inherit;
        }
      }
    }

    //li.ant-menu-item:hover {
    //  background-color: blue !important;
    //}

    //li.ant-menu-submenu:hover {
    //  background-color: blue !important;
    //}
  }

  .menu-spin-container {
    height: 100%;
    display: flex;
    //align-items: center;
    justify-content: center;
    padding-top: 4rem;
  }

  .ant-result-icon {
    color: ${(p) => p.theme.error};
  }

  ${hideScrollbar()}
`;

export const SiderItemsWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background: transparent;
  ${respondTo.down('sm')} {
    gap: 0;
  }
`;

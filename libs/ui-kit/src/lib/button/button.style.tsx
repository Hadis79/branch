import styled, { css } from 'styled-components';
import { Button as AntButton } from 'antd';
import { cssVar } from '@branch-services/utils';

const defaultStyles = css`
  color: ${(p) => p.theme.textPrimary};
  background-color: ${(p) => p.theme.surface};
`;

const tableStyles = css`
  color: ${(p) => p.theme.primary};
  background-color: ${(p) => p.theme.background};
  border: none;
  box-shadow: none;
  display: table-cell;
`;

const primaryOutlined = css`
  color: ${(p) => p.theme.primary};
  border: ${(p) => `1px solid ${p.theme.primary}`};
  background-color: ${(p) => p.theme.surface};
`;

const linkStyles = css`
  color: ${(p) => p.theme.primary};
`;

export const StyledButton = styled<any>(AntButton)`
  ${(p) => p.org_type === 'default' && defaultStyles}
  ${(p) => p.org_type === 'primaryOutlined' && primaryOutlined}
  ${(p) => p.org_type === 'table' && tableStyles}
  ${(p) => p.org_type === 'link' && linkStyles}
  ${(p) =>
    p.flex &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row-reverse;
    `}
  > * {
    //margin-left: 0.5rem;
  }

  > *:first-child {
    margin-left: 0;
  }

  &.ant-btn-lg {
    border-radius: var(${cssVar.radius});
    font-size: 1.6rem;
  }

  &.ant-btn {
    column-gap: 0.8rem;
    .ant-btn-icon:not(:last-child) {
      margin-inline-end: 0;
    }
    &.ant-btn-variant-link:hover {
      color: ${(p) => p.theme.textHoverColor} !important;
    }
  }

  &.ant-btn-primary,
  &.ant-btn-default,
  &.ant-btn-danger {
    box-shadow: none;
  }

  &.ant-btn-primary:hover,
  &.ant-btn-default:hover,
  &.ant-btn-danger:hover {
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  }
`;

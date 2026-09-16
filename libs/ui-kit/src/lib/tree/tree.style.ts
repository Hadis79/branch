import styled from 'styled-components';
import { Tree as AntTree } from 'antd';
import { ThemeID } from '@branch-services/types';
import { getRelatedColor } from '@branch-services/utils';

export const StyledTree = styled<any>(AntTree)`
  --node-offset: 0.8rem;

  .ant-tree-treenode {
    //color: #17387a;
    //font-size: 2rem;
    //margin: 0.5rem 0;
  }

  & .ant-tree-checkbox {
    /* top: initial; */
    margin-inline: 8px;
    align-self: center;
    margin-top: 0;
  }

  & .ant-tree-node-content-wrapper,
  & .ant-tree-checkbox + span {
    padding: 6px;
  }

  .node-item-${(p) => p.secondary} .ant-tree-node-content-wrapper {
    //color: #17387a;
    //font-size: 2rem;
    //margin: 0.5rem 0;
    background-color: ${(p) => p.theme.background};
  }

  .ant-tree-switcher-wrapper {
    background-color: ${(p) => !p.isCompact && p.theme.background};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem !important;
    margin-top: var(--node-offset);
  }

  .ant-tree-node-content-wrapper {
    padding: var(--node-offset) ${(p) => !p.isCompact && '1rem'};
    margin: auto ${(p) => !p.isCompact && '1rem'};
    //width: 100%;
  }

  .tree-root {
    font-weight: bold;
    color: ${(p) => getRelatedColor(p.theme.id, p.theme.primary, p.theme.textPrimary)};
  }

  .ant-tree-switcher-leaf-line:after,
  .ant-tree-treenode-leaf-last .ant-tree-switcher-leaf-line:before {
    height: 2rem !important;
  }
`;

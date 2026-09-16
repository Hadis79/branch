import { respondTo } from '@branch-services/utils';
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle<any>`
.ant-tree-select-dropdown{
  padding-left: 1.6rem;
  padding-right: 1.6rem;
}

.ant-tree-select-dropdown .ant-select-tree .ant-select-tree-switcher .ant-select-tree-switcher-icon{
  color: ${(p) => p.theme.textTerritory};
    font-size: 1.5rem;
    font-weight: bold;
   &.expanded{
    color: ${(p) => p.theme.primary};
   }
   
}
  .ant-tree-select-dropdown .ant-select-tree .ant-select-tree-checkbox{
    margin-top: 0 ;
    margin-bottom: 4px;
    align-self: center;
    
    .ant-select-tree-checkbox-inner{
      width: 18px;
      height: 18px;
      border-radius: 2px;
      border: 1.4px solid ${(p) => p.theme.primary};
      
    }
   
    &.ant-select-tree-checkbox-checked{
      .ant-select-tree-checkbox-inner{
     
      &:after{
          width:6px;
          height: 12px;
          top:7px
          
        }
    }
    }
 
    &.ant-select-tree-checkbox-indeterminate{
      .ant-select-tree-checkbox-inner{
        &:after{
          width: 10px;
          height: 10px;
        }
      
      }
    }
  }
  .tree-root {
    font-weight: 500;
  }
  .ant-select-selection-item{
    width: 5rem;
    text-overflow:ellipsis ;

    ${respondTo.down('sm')} {
      font-size: 1.5rem;
    }
  }
  .ant-select-tree-treenode-selected > .ant-select-tree-node-content-wrapper,
  .ant-select-tree-treenode-selected > .ant-select-tree-node-content-wrapper:hover,
  .ant-select-tree-treenode-selected .ant-select-tree-node-content-wrapper,
  .ant-select-tree-treenode-selected .ant-select-tree-node-content-wrapper:hover {
    outline: none !important;
  }
`;

export const CustomTreeSelectWrapper = styled.div`
  .ant-select-arrow {
    color: ${(p) => p.theme.textSecondary};
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

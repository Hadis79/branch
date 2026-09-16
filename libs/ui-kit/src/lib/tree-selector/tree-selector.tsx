import React, { useState } from 'react';
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd/es/tree-select';

import { DownOutlined } from '@ant-design/icons';

import * as S from './tree-selector.style';

interface CustomTreeSelectProps extends TreeSelectProps<string[]> {
  treeData: any;
  checkable?: boolean;
  onCheckChange?: (checkedKeys: string[]) => void;
  showLine?: boolean;
}

export const CustomTreeSelector: React.FC<CustomTreeSelectProps> = ({
  treeData,
  checkable = false,
  onCheckChange,
  showLine = false,
  ...restProps
}) => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

  const handleCheck = (checked: string[]) => {
    setCheckedKeys(checked);
    if (onCheckChange) {
      onCheckChange(checked);
    }
  };

  return (
    <S.CustomTreeSelectWrapper>
      <S.GlobalStyle />
      <TreeSelect
        switcherIcon={<DownOutlined />}
        treeData={treeData ?? []}
        treeCheckable={checkable}
        showCheckedStrategy={TreeSelect.SHOW_PARENT}
        style={{ width: '100%' }}
        onChange={handleCheck}
        treeLine={showLine}
        {...restProps}
      />
    </S.CustomTreeSelectWrapper>
  );
};

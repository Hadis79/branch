import React, { useEffect, useMemo, useState } from 'react';
import { Tree as AntTree, TreeProps as AntTreeProps } from 'antd';
import { collectKeys, collectSubChildKeys } from './tree-util';

import { StyledTree } from './tree.style';

export type TreeProps = AntTreeProps & {
  secondaryNode?: any;
  expandLevel?: number;
  unselectable?: boolean;
  isRow?: boolean;
  isCompact?: boolean;
};

export const Tree = (props: TreeProps) => {
  const {
    showLine = true,
    unselectable = true,
    switcherIcon,
    treeData,
    secondaryNode = null,
    onExpand,
    onSelect,
    expandLevel, // Default to expand all levels
    selectedKeys: _selectedKeys = [],
    defaultSelectedKeys = [],
    isRow,
    ...rest
  } = props;

  const [expandedKeys, setExpandedKeys] = useState<React.Key[] | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([..._selectedKeys, ...defaultSelectedKeys]);

  const memoizedCollectKeys = useMemo(() => collectKeys, [treeData, expandLevel]);

  useEffect(() => {
    let keys: any[] = [];

    if (!treeData || treeData.length === 0) return;

    const subChildKeys = collectSubChildKeys(treeData);

    if (expandedKeys === null && treeData) {
      keys = memoizedCollectKeys(treeData, expandLevel);
    }

    const uniqueKeysSet = new Set([...(expandedKeys ?? []), ...keys, ...subChildKeys]);
    const finalKeys = Array.from(uniqueKeysSet);

    // if (expandedKeys.length !== finalKeys.length) {
    setExpandedKeys([...finalKeys]);
    // }
  }, [treeData, expandLevel, expandedKeys?.length]);

  const switcherIconFn = useMemo(
    () => (nodeProps) =>
      (
        <span className={'ant-tree-switcher-wrapper'}>
          {nodeProps.expanded ? <i className={'ri-arrow-up-s-line'} /> : <i className={'ri-arrow-down-s-line'} />}
        </span>
      ),
    []
  );

  const handleExpand = (keys, info) => {
    setExpandedKeys(keys);
    if (onExpand) {
      onExpand(keys, info);
    }
  };

  const handleSelect = (keys, info) => {
    if (unselectable) {
      setSelectedKeys([info.node.key]);
    } else {
      setSelectedKeys(keys);
    }

    if (onSelect) {
      onSelect(keys, info);
    }
  };

  return (
    <StyledTree
      {...rest}
      showLine={showLine}
      switcherIcon={switcherIcon ?? switcherIconFn}
      treeData={treeData}
      secondary={secondaryNode?.key}
      expandedKeys={expandedKeys}
      onExpand={handleExpand}
      onSelect={handleSelect}
      selectedKeys={selectedKeys}
    />
  );
};

Tree.TreeNode = AntTree.TreeNode;

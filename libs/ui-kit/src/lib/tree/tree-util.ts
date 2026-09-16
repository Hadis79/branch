export const collectKeys = (nodes, level: any = null) => {
  const collectKeysHelper = (nodes, currentLevel) => {
    let keys: any[] = [];
    for (const node of nodes) {
      keys.push(node.key);

      if (level === null || currentLevel < level) {
        // Recursively collect keys of nodes with children
        if (node.children && node.children.length > 0) {
          keys = [...keys, ...collectKeysHelper(node.children, currentLevel + 1)];
        }
      } else if (level === 0) return [];
    }

    return keys;
  };

  // Start with the root level (currentLevel = 1)
  return collectKeysHelper(nodes, 1);
};

export const collectSubChildKeys = (nodes) => {
  const parentKeys: any[] = [];

  const collectKeysHelper = (nodes) => {
    for (const node of nodes) {
      if (node?.isSubChild === true) {
        const parentId = node?.rawData?.parentId?.toString();
        if (parentId && !parentKeys.includes(parentId)) {
          parentKeys.push(parentId);
        }
      }

      if (node.children && node.children.length > 0) {
        collectKeysHelper(node.children);
      }
    }
  };

  collectKeysHelper(nodes);

  return parentKeys;
};

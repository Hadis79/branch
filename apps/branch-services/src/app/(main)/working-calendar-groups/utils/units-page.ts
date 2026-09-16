import type { PageParams } from './types';

// The manual edit table pages one combined list: [...added units, ...server units without the removed ones].
// The server only pages its own list, so each table page is mapped back to server positions here.

type UnitsPageLayoutParams = PageParams & {
  addedCount: number;
  serverTotal: number;
  // Positions (in the server list) of the removed units
  removedIndexes: number[];
};

export type UnitsPageLayout = {
  total: number;
  // Slice of the added units shown on this page
  addedStart: number;
  addedEnd: number;
  // Server positions of the remaining rows of this page, in order
  serverIndexes: number[];
};

// Position in the server list of the n-th unit that was not removed
const toServerIndex = (filteredIndex: number, sortedRemoved: number[]) => {
  let index = filteredIndex;
  for (const removed of sortedRemoved) {
    if (removed > index) break;
    index++;
  }
  return index;
};

export const getUnitsPageLayout = ({
  page,
  size,
  addedCount,
  serverTotal,
  removedIndexes,
}: UnitsPageLayoutParams): UnitsPageLayout => {
  const total = addedCount + Math.max(serverTotal - removedIndexes.length, 0);
  const start = (page - 1) * size;
  const end = Math.min(page * size, total);

  const addedStart = Math.min(start, addedCount);
  const addedEnd = Math.min(end, addedCount);

  const sortedRemoved = [...removedIndexes].sort((a, b) => a - b);
  const serverIndexes: number[] = [];
  for (
    let filteredIndex = Math.max(start, addedCount) - addedCount;
    filteredIndex < end - addedCount;
    filteredIndex++
  ) {
    serverIndexes.push(toServerIndex(filteredIndex, sortedRemoved));
  }

  return { total, addedStart, addedEnd, serverIndexes };
};

// One-based server pages (of `size` items) that contain the given positions
export const getServerPages = (serverIndexes: number[], size: number): number[] => [
  ...new Set(serverIndexes.map((index) => Math.floor(index / size) + 1)),
];

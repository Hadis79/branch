import { getServerPages, getUnitsPageLayout } from './units-page';

const layout = (page: number, addedCount: number, removedIndexes: number[] = [], serverTotal = 25, size = 10) =>
  getUnitsPageLayout({ page, size, addedCount, serverTotal, removedIndexes });

describe('getUnitsPageLayout', () => {
  it('maps pages straight to the server list without changes', () => {
    expect(layout(1, 0)).toEqual({
      total: 25,
      addedStart: 0,
      addedEnd: 0,
      serverIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    });
    expect(layout(3, 0).serverIndexes).toEqual([20, 21, 22, 23, 24]);
  });

  it('puts added units first and shifts the server rows', () => {
    const first = layout(1, 3);
    expect(first).toMatchObject({ total: 28, addedStart: 0, addedEnd: 3 });
    expect(first.serverIndexes).toEqual([0, 1, 2, 3, 4, 5, 6]);

    const second = layout(2, 3);
    expect(second).toMatchObject({ addedStart: 3, addedEnd: 3 });
    expect(second.serverIndexes).toEqual([7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

    expect(layout(3, 3).serverIndexes).toEqual([17, 18, 19, 20, 21, 22, 23, 24]);
  });

  it('spreads more added units than a page over several pages', () => {
    expect(layout(1, 12)).toMatchObject({ addedStart: 0, addedEnd: 10, serverIndexes: [] });
    expect(layout(2, 12)).toMatchObject({ addedStart: 10, addedEnd: 12, serverIndexes: [0, 1, 2, 3, 4, 5, 6, 7] });
  });

  it('skips removed server rows and pulls the next ones in', () => {
    const first = layout(1, 0, [2, 5]);
    expect(first.total).toBe(23);
    expect(first.serverIndexes).toEqual([0, 1, 3, 4, 6, 7, 8, 9, 10, 11]);
    expect(layout(3, 0, [2, 5]).serverIndexes).toEqual([22, 23, 24]);
  });

  it('handles removed rows next to each other and added units together', () => {
    expect(layout(1, 1, [0, 1, 2]).serverIndexes).toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });
});

describe('getServerPages', () => {
  it('returns the distinct one-based pages of the positions', () => {
    expect(getServerPages([7, 8, 9, 10, 11], 10)).toEqual([1, 2]);
    expect(getServerPages([], 10)).toEqual([]);
  });
});

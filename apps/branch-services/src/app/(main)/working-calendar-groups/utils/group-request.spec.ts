import { toGroupRequest } from './group-request';

const currentUnits = [
  { name: 'First', code: '1' },
  { name: 'Second', code: '2' },
];

describe('toGroupRequest', () => {
  it('maps manual selections to API units', () => {
    expect(
      toGroupRequest({ values: { name: 'Group', units: [{ label: 'First', value: '1' }] }, isFileEntry: false })
    ).toEqual({ name: 'Group', units: [currentUnits[0]] });
  });

  it('preserves existing units when only renaming a file-based group', () => {
    expect(toGroupRequest({ values: { name: 'Renamed' }, isFileEntry: true, currentUnits })).toEqual({
      name: 'Renamed',
      units: currentUnits,
    });
  });

  it('uses uploaded units instead of existing units', () => {
    expect(
      toGroupRequest({ values: { name: 'Group' }, isFileEntry: true, currentUnits, uploadedUnits: [currentUnits[1]] })
        .units
    ).toEqual([currentUnits[1]]);
  });

  it('does not confuse an empty upload with an absent upload', () => {
    expect(
      toGroupRequest({ values: { name: 'Group' }, isFileEntry: true, currentUnits, uploadedUnits: [] }).units
    ).toEqual([]);
  });

  it('applies manual additions and removals to existing units', () => {
    expect(
      toGroupRequest({
        values: {
          name: 'Group',
          addedUnits: [{ label: 'Third', value: '3' }],
          removedUnits: [{ code: '1', index: 0 }],
        },
        isFileEntry: false,
        currentUnits,
      }).units
    ).toEqual([{ name: 'Third', code: '3' }, currentUnits[1]]);
  });
});

import { applyUnitChanges } from './utils';

const unit = (code: string) => ({ code, name: `unit ${code}` });

describe('applyUnitChanges', () => {
  const current = [unit('1'), unit('2'), unit('3')];

  it('returns the current units when nothing changed', () => {
    expect(applyUnitChanges(current, [], [])).toEqual(current);
  });

  it('removes the removed codes and puts added units first', () => {
    expect(applyUnitChanges(current, [unit('9')], ['2'])).toEqual([unit('9'), unit('1'), unit('3')]);
  });

  it('keeps a single entry when an added unit is already a member', () => {
    expect(applyUnitChanges(current, [unit('3')], [])).toEqual([unit('3'), unit('1'), unit('2')]);
  });

  it('drops a unit that is both added and removed', () => {
    expect(applyUnitChanges(current, [unit('9')], ['9', '1'])).toEqual([unit('2'), unit('3')]);
  });
});

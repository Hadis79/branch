import type { GroupUnit, UnitOption } from './types';

export const formatCount = (value: number): string => value.toLocaleString('fa-IR');

export const toGroupUnit = ({ label, value }: UnitOption): GroupUnit => ({ name: label, code: value });

export const toUnitOption = ({ name, code }: GroupUnit): UnitOption => ({ label: name, value: code });

// Final member list: current units minus the removed ones, plus the added ones (no duplicate codes)
export const applyUnitChanges = (units: GroupUnit[], added: GroupUnit[], removedCodes: string[]): GroupUnit[] => {
  const removed = new Set(removedCodes);
  const byCode = new Map<string, GroupUnit>();

  [...added, ...units].forEach((unit) => {
    if (!removed.has(unit.code) && !byCode.has(unit.code)) byCode.set(unit.code, unit);
  });

  return [...byCode.values()];
};

type CalculateRowParams = {
  index: number;
  pagination?: {
    page?: number;
    size?: number;
  };
};

export function calculateRow({ index, pagination }: CalculateRowParams): number {
  const { page = 1, size = 10 } = pagination ?? {};

  return (page - 1) * size + index + 1;
}

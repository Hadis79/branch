import { Api } from './index';
import type { GroupUnit } from '../utils/types';

const PAGE_SIZE = 100;

// Collects every unit of a group by walking the service pages (the update request needs the full list)
export const fetchAllGroupUnits = async (id: string): Promise<GroupUnit[]> => {
  const units: GroupUnit[] = [];

  for (let page = 1; ; page++) {
    const { content, last } = await Api.getGroupUnits({ id, page, size: PAGE_SIZE });
    units.push(...content);
    if (last || content.length === 0) return units;
  }
};

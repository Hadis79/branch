import type { ColumnsType } from '@branch-services/ui-kit';
import type { GroupUnit, PageParams } from '../../utils/types';
import { calculateRow } from '../../utils/utils';

type Options = { nameTitle: string; codeTitle: string; pagination: PageParams };

export const unitColumns = ({ nameTitle, codeTitle, pagination }: Options): ColumnsType<GroupUnit> => [
  {
    title: '#',
    key: 'row',
    align: 'center',
    render: (_value, _record, index) => calculateRow({ index, pagination }),
  },
  { title: nameTitle, dataIndex: 'name', align: 'center' },
  { title: codeTitle, dataIndex: 'code', align: 'center' },
];

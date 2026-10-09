import type { ColumnsType } from '@branch-services/ui-kit';

import { formatDigits, getRowNumber } from '../../utils/utils';
import type { PageParams, UnitResponse } from '../../utils/types';

type Options = { nameTitle: string; codeTitle: string; pagination: PageParams };

export const getAffectedUnitColumns = ({ nameTitle, codeTitle, pagination }: Options): ColumnsType<UnitResponse> => [
  {
    title: '#',
    key: 'row',
    align: 'center',
    render: (_value, _record, index) => formatDigits(getRowNumber(index, pagination)),
  },
  { title: nameTitle, dataIndex: 'name', align: 'center' },
  { title: codeTitle, dataIndex: 'code', align: 'center', render: formatDigits },
];

import { Box } from '@branch-services/ui-kit';

import Filter from '../../components/group-list/filter/filter';
import DataTable from '../../components/group-list/data-table/data-table';

import * as S from '../../components/app/app.style';

const WorkingCalendarGroupList = () => (
  <S.AppContainer>
    <Box width='100%' justifyContent='center' alignItems='center' flexDirection='column'>
      <Filter />
      <DataTable />
    </Box>
  </S.AppContainer>
);

export default WorkingCalendarGroupList;

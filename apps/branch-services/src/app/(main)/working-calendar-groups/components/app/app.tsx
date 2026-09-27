import type { ReactNode } from 'react';

import GroupMessage from '../group-message';
import GroupList from '../../pages/group-list';
import GroupFormPage from '../../pages/group-form-page';
import GroupDetails from '../../pages/group-details';
import { WorkingCalendarGroupPage } from '../../utils/constants';
import useWorkingCalendarGroupPage from '../../hooks/use-working-calendar-group-page';

const App = () => {
  const { currentPage } = useWorkingCalendarGroupPage();

  const pages: Record<WorkingCalendarGroupPage, ReactNode> = {
    [WorkingCalendarGroupPage.LIST]: (
      <>
        <GroupMessage />
        <GroupList />
      </>
    ),
    [WorkingCalendarGroupPage.GROUP_DETAILS]: <GroupDetails />,
    [WorkingCalendarGroupPage.ADD]: <GroupFormPage />,
    [WorkingCalendarGroupPage.EDIT]: <GroupFormPage />,
    [WorkingCalendarGroupPage.DETAILS]: <GroupFormPage />,
  };

  return pages[currentPage];
};

export default App;

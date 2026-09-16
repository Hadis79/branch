import { ComponentType } from 'react';

import { MessageBox } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import AddWorkingCalendarGroup from '../../pages/add';
import UploadDetails from '../../pages/upload-details';
import EditWorkingCalendarGroup from '../../pages/edit';
import WorkingCalendarGroupList from '../../pages/list';
import useWidgetStore from '../../store/use-widget-store';
import { WorkingCalendarGroupPage } from '../../utils/constants';
import useWorkingCalendarGroupPage from '../../hooks/use-working-calendar-group-page';

const PAGE_COMPONENTS: Record<WorkingCalendarGroupPage, ComponentType> = {
  [WorkingCalendarGroupPage.ADD]: AddWorkingCalendarGroup,
  [WorkingCalendarGroupPage.EDIT]: EditWorkingCalendarGroup,
  [WorkingCalendarGroupPage.LIST]: WorkingCalendarGroupList,
  [WorkingCalendarGroupPage.DETAILS]: UploadDetails,
};

const GroupListMessage = () => {
  const [t] = useTr();
  const message = useWidgetStore((state) => state.message);
  const resetMessage = useWidgetStore((state) => state.resetMessage);

  if (!message) return null;

  const { linkProps, shouldTranslate, txt, ...messageProps } = message;

  return (
    <MessageBox
      {...messageProps}
      message={shouldTranslate ? t(txt) : txt}
      closable
      shouldScroll
      style={{ margin: '1.4rem 3.2rem 0' }}
      linkProps={
        linkProps && {
          title: linkProps.title as string,
          url: linkProps.url as string,
        }
      }
      onClose={resetMessage}
    />
  );
};

const App = () => {
  const { currentPage } = useWorkingCalendarGroupPage();
  const PageComponent = PAGE_COMPONENTS[currentPage];
  const isFormPage = currentPage === WorkingCalendarGroupPage.ADD || currentPage === WorkingCalendarGroupPage.EDIT;
  const isDetailsPage = currentPage === WorkingCalendarGroupPage.DETAILS;
  console.log(currentPage);
  return (
    <>
      {currentPage === WorkingCalendarGroupPage.LIST && <GroupListMessage />}
      {(isFormPage || isDetailsPage) && (
        <div hidden={isDetailsPage}>
          <AddWorkingCalendarGroup />
        </div>
      )}
      {!isFormPage && <PageComponent />}
    </>
  );
};

export default App;

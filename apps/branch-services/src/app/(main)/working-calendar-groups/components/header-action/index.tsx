import { Button } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import { WorkingCalendarGroupPage } from '../../utils/constants';
import useWorkingCalendarGroupPage from '../../hooks/use-working-calendar-group-page';

const WorkingCalendarGroupHeaderAction = () => {
  const [t] = useTr();
  const { currentPage, navigateTo, navigateToForm } = useWorkingCalendarGroupPage();
  const isListPage = currentPage === WorkingCalendarGroupPage.LIST;
  const isDetailsPage = currentPage === WorkingCalendarGroupPage.DETAILS;

  const action = isListPage
    ? {
        buttonType: 'primary' as const,
        icon: 'ri ri-add-line',
        label: t('add_group'),
        targetPage: WorkingCalendarGroupPage.ADD,
      }
    : {
        buttonType: 'link' as const,
        icon: 'ri ri-arrow-left-line',
        label: t('button.return'),
        targetPage: WorkingCalendarGroupPage.LIST,
      };

  const handleClick = () => (isDetailsPage ? navigateToForm() : navigateTo(action.targetPage));

  return (
    <Button type={action.buttonType} icon={<i className={action.icon} />} iconPosition='start' onClick={handleClick}>
      {action.label}
    </Button>
  );
};

export default WorkingCalendarGroupHeaderAction;

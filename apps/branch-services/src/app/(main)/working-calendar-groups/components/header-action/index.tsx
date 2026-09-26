import { Button } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import { WorkingCalendarGroupPage } from '../../utils/constants';
import useWorkingCalendarGroupPage from '../../hooks/use-working-calendar-group-page';

const WorkingCalendarGroupHeaderAction = () => {
  const [t] = useTr();
  const { currentPage, navigateTo, goBack } = useWorkingCalendarGroupPage();
  const isListPage = currentPage === WorkingCalendarGroupPage.LIST;

  const action = isListPage
    ? {
        buttonType: 'primary' as const,
        icon: 'ri ri-add-line',
        label: t('add_group'),
      }
    : {
        buttonType: 'link' as const,
        icon: 'ri ri-arrow-left-line',
        label: t('button.return'),
      };

  // Every non-list page was reached by pushing a new route, so plain browser back returns
  // to wherever the user actually came from (list, form, or the other details page)
  const handleClick = () => (isListPage ? navigateTo(WorkingCalendarGroupPage.ADD) : goBack());

  return (
    <Button type={action.buttonType} icon={<i className={action.icon} />} iconPosition='start' onClick={handleClick}>
      {action.label}
    </Button>
  );
};

export default WorkingCalendarGroupHeaderAction;

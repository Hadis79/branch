import { Button } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import { WorkingCalendarGroupPage } from '../../utils/constants';
import useWorkingCalendarGroupPage from '../../hooks/use-working-calendar-group-page';
import { useGroupListQueryContext } from '../../queries/group-list-query-context';
import useGroupStore from '../../store/use-widget-store';

const WorkingCalendarGroupHeaderAction = () => {
  const [t] = useTr();
  const { currentPage, navigateTo, goBack } = useWorkingCalendarGroupPage();
  const isListPage = currentPage === WorkingCalendarGroupPage.LIST;
  const filter = useGroupStore((state) => state.filter);
  const query = useGroupListQueryContext();
  const hasFilter = Boolean(filter.name?.trim() || filter.groupType);
  const isEmptyList = isListPage && !hasFilter && query.isSuccess && !query.isFetching && query.data.totalElements === 0;

  if (isEmptyList) return null;

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
    <Button
      type={action.buttonType}
      icon={isListPage ? undefined : <i className={action.icon} />}
      iconPosition='start'
      style={isListPage ? { flexDirection: 'row', direction: 'rtl' } : undefined}
      onClick={handleClick}
    >
      {isListPage && <i className={action.icon} aria-hidden='true' />}
      <span>{action.label}</span>
    </Button>
  );
};

export default WorkingCalendarGroupHeaderAction;

import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import useServicesQuery from '../../queries/use-services-query';
import useServiceStore from '../../store/use-widget-store';

// Hidden while the module is empty: the empty state has its own create button
const ServiceHeaderAction = () => {
  const [t] = useTr();
  const hasFilter = useServiceStore((state) => Boolean(state.filter.name));
  const openModal = useServiceStore((state) => state.openModal);
  const { data } = useServicesQuery();

  if (!data?.totalElements && !hasFilter) return null;

  return (
    <Button
      type='primary'
      icon={<i className='ri-add-line' />}
      iconPosition='start'
      onClick={() => openModal('create')}
    >
      {t('new_service')}
    </Button>
  );
};

export default ServiceHeaderAction;

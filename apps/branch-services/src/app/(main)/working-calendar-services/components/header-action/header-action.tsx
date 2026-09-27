import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import useServiceStore from '../../store/use-widget-store';
import useEmptyServiceList from '../../hooks/use-empty-service-list';

// Hidden while the module is empty: the empty state has its own create button
const ServiceHeaderAction = () => {
  const [t] = useTr();
  const openModal = useServiceStore((state) => state.openModal);

  const isEmptyList = useEmptyServiceList();

  if (isEmptyList) return null;

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

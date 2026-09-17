import { useTr } from '@branch-services/translation';
import { Box, Button, EmptyData } from '@branch-services/ui-kit';

import useServiceStore from '../../../store/use-widget-store';

const ServiceEmptyState = () => {
  const [t] = useTr();
  const openModal = useServiceStore((state) => state.openModal);

  return (
    <Box flexDirection='column' alignItems='center' gap='2.4rem' padding='3.2rem'>
      <EmptyData description={t('no_services')} />
      <Button type='primary' icon={<i className='ri-add-line' />} onClick={() => openModal('create')}>
        {t('new_service')}
      </Button>
    </Box>
  );
};

export default ServiceEmptyState;

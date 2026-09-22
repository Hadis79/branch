import { useTr } from '@branch-services/translation';
import { Box, Button, EmptyData } from '@branch-services/ui-kit';

import useServiceStore from '../../../store/use-widget-store';

const ServiceEmptyState = () => {
  const [t] = useTr();
  const openModal = useServiceStore((state) => state.openModal);

  return (
    <Box
      flexDirection='column'
      height={'100%'}
      justifyContent='center'
      alignItems='center'
      gap='2.4rem'
      padding='3.2rem'
    >
      <EmptyData />
      <Button style={{ width: 'fit-content' }} type='primary' onClick={() => openModal('create')}>
        {t('new_service')}
        <i className='ri-add-line' />
      </Button>
    </Box>
  );
};

export default ServiceEmptyState;

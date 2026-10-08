import { useTr } from '@branch-services/translation';
import { Box, Button, EmptyData } from '@branch-services/ui-kit';

import useServiceRulesPage from '../../hooks/use-service-rules-page';
import { ServiceRulesPage } from '../../utils/constants';

const RuleEmptyState = () => {
  const [t] = useTr();
  const { navigateTo } = useServiceRulesPage();

  return (
    <Box flexDirection='column' height='100%' justifyContent='center' alignItems='center' gap='2.4rem' padding='3.2rem'>
      <EmptyData />
      <Button style={{ width: 'fit-content' }} type='primary' onClick={() => navigateTo(ServiceRulesPage.CREATE)}>
        {t('new_rule')}
        <i className='ri-add-line' />
      </Button>
    </Box>
  );
};

export default RuleEmptyState;

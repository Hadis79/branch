import { useTr } from '@branch-services/translation';
import { Box, Button, EmptyData } from '@branch-services/ui-kit';

type ErrorStateProps = {
  onRetry: () => void;
  retrying?: boolean;
};

// Stands in for content that failed to load; the error itself is shown in the page's message
const ErrorState = ({ onRetry, retrying = false }: ErrorStateProps) => {
  const [t] = useTr();

  return (
    <Box flexDirection='column' height='100%' justifyContent='center' alignItems='center' gap='2.4rem' padding='3.2rem'>
      <EmptyData description={t('load_failed')} />
      <Button style={{ width: 'fit-content' }} type='primaryOutlined' loading={retrying} onClick={onRetry}>
        {t('retry')}
        <i className='ri-refresh-line' />
      </Button>
    </Box>
  );
};

export default ErrorState;

import { useTr } from '@branch-services/translation';
import { Box, Text } from '@branch-services/ui-kit';

import ExceptionCard from './exception-card';
import useDeleteExceptionMutation from '../../queries/use-delete-exception-mutation';
import useExceptionsQuery from '../../queries/use-exceptions-query';

const ExceptionsSection = () => {
  const [t] = useTr();
  const { data: exceptions } = useExceptionsQuery();
  const deleteMutation = useDeleteExceptionMutation();

  if (!exceptions?.length) return null;

  return (
    <Box flexDirection='column' gap='1.2rem'>
      <Text as='span' fontWeight={500}>
        {t('exceptions_section_title')}
      </Text>
      {exceptions.map((exception) => (
        <ExceptionCard key={exception.id} exception={exception} onDelete={() => deleteMutation.mutate(exception.id)} />
      ))}
    </Box>
  );
};

export default ExceptionsSection;

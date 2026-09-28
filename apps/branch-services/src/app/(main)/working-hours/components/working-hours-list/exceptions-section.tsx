import { useTr } from '@branch-services/translation';
import { Box, EmptyData, Text } from '@branch-services/ui-kit';

import ExceptionCard from './exception-card';
import useDeleteExceptionMutation from '../../queries/use-delete-exception-mutation';
import useExceptionsQuery from '../../queries/use-exceptions-query';
import { isExpiredException } from '../../utils/utils';
import type { WorkingHoursException } from '../../utils/types';

const ExceptionsSection = () => {
  const [t] = useTr();
  const { data: exceptions } = useExceptionsQuery();
  const deleteMutation = useDeleteExceptionMutation();

  if (!exceptions?.length)
    return (
      <Box flexGrow={1} alignItems='center' justifyContent='center' fillChildren={false}>
        <EmptyData />
      </Box>
    );

  const active: WorkingHoursException[] = [];
  const expired: WorkingHoursException[] = [];
  exceptions.forEach((exception) => (isExpiredException(exception.endDate) ? expired : active).push(exception));

  return (
    <Box flexDirection='column' gap='2.4rem'>
      {active.length > 0 && (
        <Box flexDirection='column' gap='1.2rem'>
          <Text as='span' fontWeight={500}>
            {t('exceptions_section_title')}
          </Text>
          {active.map((exception) => (
            <ExceptionCard
              key={exception.id}
              exception={exception}
              onDelete={() => deleteMutation.mutate(exception.id)}
            />
          ))}
        </Box>
      )}
      {expired.length > 0 && (
        <Box flexDirection='column' gap='1.2rem'>
          <Text as='span' fontWeight={500}>
            {t('expired_exceptions_section_title')}
          </Text>
          {expired.map((exception) => (
            <ExceptionCard key={exception.id} exception={exception} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ExceptionsSection;

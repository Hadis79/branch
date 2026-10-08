import { useTr } from '@branch-services/translation';
import { ApiUtil } from '@branch-services/utils';
import { Box, EmptyData, Text } from '@branch-services/ui-kit';
import { useState } from 'react';

import ExceptionCard from './exception-card';
import { ExceptionCardsSkeleton } from '../loading-skeletons/loading-skeletons';
import DeleteExceptionModal from '../working-hours-modal/delete-exception-modal';
import useDeleteExceptionMutation from '../../queries/use-delete-exception-mutation';
import useExceptionsQuery from '../../queries/use-exceptions-query';
import useWorkingHoursStore from '../../store/use-widget-store';
import useQueryErrorMessage from '../../hooks/use-query-error-message';
import { isExpiredException } from '../../utils/utils';
import type { WorkingHoursException } from '../../utils/types';

const ExceptionsSection = () => {
  const [t] = useTr();
  const { data: exceptions, isLoading, error } = useExceptionsQuery();
  const deleteMutation = useDeleteExceptionMutation();
  const setMessage = useWorkingHoursStore((state) => state.setMessage);
  const [selectedException, setSelectedException] = useState<WorkingHoursException | null>(null);
  useQueryErrorMessage(error);

  const handleCloseDelete = () => {
    if (deleteMutation.isPending) return;
    deleteMutation.reset();
    setSelectedException(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedException || deleteMutation.isPending) return;

    deleteMutation.mutate(selectedException.id, {
      onSuccess: () => {
        setMessage({ txt: 'delete_exception_success', type: 'success', shouldTranslate: true });
        setSelectedException(null);
      },
      onError: (error) => {
        setMessage(ApiUtil.getErrorMessage(error));
        setSelectedException(null);
      },
    });
  };

  if (isLoading) return <ExceptionCardsSkeleton />;
  if (error) return null;

  if (!exceptions?.length)
    return (
      <Box flexGrow={1} alignItems='center' justifyContent='center' fillChildren={false}>
        <EmptyData />
      </Box>
    );

  const active: WorkingHoursException[] = [];
  const expired: WorkingHoursException[] = [];
  exceptions.forEach((exception) =>
    (isExpiredException(exception.endDate, exception.days) ? expired : active).push(exception)
  );

  return (
    <Box flexDirection='column' gap='2.4rem'>
      {active.length > 0 && (
        <Box flexDirection='column' gap='1.2rem'>
          <Text as='span' fontWeight={500}>
            {t('exceptions_section_title')}
          </Text>
          {active.map((exception) => (
            <ExceptionCard key={exception.id} exception={exception} onDelete={() => setSelectedException(exception)} />
          ))}
        </Box>
      )}
      {expired.length > 0 && (
        <Box flexDirection='column' gap='1.2rem'>
          <Text as='span' fontWeight={500}>
            {t('expired_exceptions_section_title')}
          </Text>
          {expired.map((exception) => (
            <ExceptionCard key={exception.id} exception={exception} isExpired />
          ))}
        </Box>
      )}
      <DeleteExceptionModal
        exception={selectedException}
        loading={deleteMutation.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDelete}
      />
    </Box>
  );
};

export default ExceptionsSection;

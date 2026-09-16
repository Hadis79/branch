import React from 'react';
import * as S from '../badges/badges.style';
import { TransactionType } from '../../../utils/enums';
import useNewRequestsWidgetStore from '../../../store/use-widget-store';
import { useTr } from '@branch-services/translation';
import { Box } from '@branch-services/ui-kit';
import { addThousandSeparator } from '@branch-services/utils';

function Badges() {
  const checkValidationResponse = useNewRequestsWidgetStore((state) => state.checkValidationResponse);
  const [t] = useTr();

  const getTransferMethodLabel = (transferMethod: TransactionType) => {
    switch (transferMethod) {
      case TransactionType.AUTO:
        return t('auto_transfer_type');
      case TransactionType.LOCAL:
        return t('local');
      case TransactionType.PAYA:
        return t('paya');
      case TransactionType.SATNA:
        return t('satna');
    }
  };
  return (
    <S.Badges>
      <Box className='badge-item'>
        <span>
          {t('transaction_type')} {':'}
        </span>
        <span>{getTransferMethodLabel(checkValidationResponse?.fileUploadDto?.paymentType)}</span>
      </Box>
      <Box className='badge-item'>
        <span>
          {t('total_records')} {':'}
        </span>
        <span>{checkValidationResponse?.fileUploadDto?.totalRecords}</span>
      </Box>
      <Box className='badge-item'>
        <span>
          {t('field.total_balance')}
          {':'}
        </span>{' '}
        <span>
          {checkValidationResponse?.fileUploadDto?.totalAmount &&
            `${addThousandSeparator(checkValidationResponse?.fileUploadDto?.totalAmount)} ${t('common.rial')}`}
        </span>
      </Box>
    </S.Badges>
  );
}

export default Badges;

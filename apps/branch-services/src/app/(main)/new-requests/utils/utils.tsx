import { TFunction } from 'i18next';
import { notification } from 'antd';
import { addThousandSeparator, ApiUtil, getValueOrDash, numberToPersian, rialToToman } from '@branch-services/utils';

export function copyText(text: any, t: TFunction) {
  navigator.clipboard.writeText(text);
  return notification.open({
    message: null,
    description: (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {t('copy_done')}
        <i className='ri-check-line' />
      </div>
    ),
    placement: 'topRight',
    style: { color: 'green' },
  });
}

export function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

export function calculateValidationPercent(validationResponse) {
  if (!validationResponse) {
    return 0;
  }

  const { successValidationCount, totalRecords, finished, errorValidationCount } = validationResponse;

  if (finished) {
    return 100;
  }

  if (!totalRecords || totalRecords <= 0) {
    return 0;
  }

  return Math.min(Math.ceil(((successValidationCount + errorValidationCount) / totalRecords) * 100), 100);
}

export const formatValueWithThousandSeparator = (value, t) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '-';
  }

  const formattedRial = `${addThousandSeparator(value)} ${t('common.rial')}`;
  const formattedToman = `${t('equal_to')} ${numberToPersian(rialToToman(value))} ${t('common.toman')}`;
  return `${getValueOrDash(formattedRial)} - ${formattedToman}`;
};

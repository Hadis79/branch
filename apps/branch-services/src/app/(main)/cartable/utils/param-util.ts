import { Obj } from '@branch-services/types';
import { addThousandSeparator, getValueOrDash, numberToPersian, rialToToman } from '@branch-services/utils';

const ParamUtil = {
  prepareCartableParams: (params: any) => {
    const { filter } = params;
    const apiParams: Obj = {};

    if (filter?.accountNumber) {
      apiParams.accountNumber = filter?.accountNumber;
    }
    if (filter?.paymentType) {
      apiParams.paymentType = filter?.paymentType;
    }
    if (filter?.requestType) {
      apiParams.requestType = filter?.requestType;
    }

    if (filter?.traceCode) {
      apiParams.traceCode = filter?.traceCode;
    }

    if (filter?.fromAmount) {
      apiParams.fromAmount = filter?.fromAmount
        ? parseInt(filter?.fromAmount?.replace(new RegExp(',', 'g'), ''))
        : null;
    }

    if (filter?.toAmount) {
      apiParams.toAmount = filter?.toAmount ? parseInt(filter?.toAmount?.replace(new RegExp(',', 'g'), '')) : null;
    }

    return apiParams;
  },
};

export default ParamUtil;

export const formatValueWithThousandSeparator = (value, t) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '-';
  }

  const formattedRial = `${addThousandSeparator(value)} ${t('common.rial')}`;
  const formattedToman = `${t('equal_to')} ${numberToPersian(rialToToman(value))} ${t('common.toman')}`;
  return `${getValueOrDash(formattedRial)} - ${formattedToman}`;
};

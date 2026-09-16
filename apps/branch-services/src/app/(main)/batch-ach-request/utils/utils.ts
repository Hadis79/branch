import {
  addThousandSeparator,
  deepCopy,
  getValueOrDash,
  numberToPersian,
  rialToToman,
  toApiDate,
  toApiFullDate,
  toIsoStringWithoutTimezone,
} from '@branch-services/utils';
import { TemplateTypes, PaymentType } from './consts';

const Utils = {
  getLocalFile: (fileName = '') => {
    const url = `/embedded/Batch-ACH-SampleFile.xlsx`;
    // switch (key) {
    //   case TemplateTypes.EXCEL_XLSX:
    //     url = '/_public/batch-ach/Batch-ACH-SampleFile.xlsx';
    //     break;
    //   case TemplateTypes.EXCEL_XLS:
    //     url = '/_public/batch-ach/Batch-ACH-SampleFile.xls';
    //     break;
    //   case TemplateTypes.TSV:
    //     url = '/_public/batch-ach/Batch-ACH-SampleFile.tsv';
    //     break;
    //   case TemplateTypes.CSV:
    //     url = '/_public/batch-ach/Batch-ACH-SampleFile.csv';
    //     break;
    //   case TemplateTypes.TXT:
    //     url = '/_public/batch-ach/Batch-ACH-SampleFile.txt';
    //     break;
    //   case TemplateTypes.CCTI_XML:
    //     url = '/_public/batch-ach/Batch-ACH-SampleFile.CCTI';
    //     break;
    // }

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  postBatchTransferRequestParams: function (params) {
    const { uploadFeedback, formValue } = params;
    const futurePaymentDate = formValue.futurePaymentDate
      ? toIsoStringWithoutTimezone(formValue.futurePaymentDate).date +
        ' ' +
        toIsoStringWithoutTimezone(formValue.futurePaymentDate).time
      : null;

    return {
      id: uploadFeedback?.id,
      title: formValue?.depositDescription,
      totalAmount: uploadFeedback?.totalAmount,
      totalRecords: uploadFeedback?.totalRecords,
      accountNumber: uploadFeedback?.sourceAccountNumber,
      description: formValue?.description || '',
      paymentType: formValue?.transferType,
      conditionNumber: formValue?.conditionNumber,
      purpose: formValue?.purpose,
      futurePaymentDescription: formValue.futurePaymentDescription || '',
      futurePaymentDate,
    };
  },
};
export default Utils;

export const arrowSVGConvertor = (dir) => {
  return dir === 'rtl' ? 'left' : 'right';
};

export const getpaymentTypeLabel = (paymentType: PaymentType, t) => {
  switch (paymentType) {
    case PaymentType.AUTO:
      return t('auto_payment_type');
    case PaymentType.LOCAL:
      return t('local');
    case PaymentType.PAYA:
      return t('paya');
    case PaymentType.SATNA:
      return t('satna');
  }
};

export const formatValueWithThousandSeparator = (value, t) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '-';
  }

  const formattedRial = `${addThousandSeparator(value)} ${t('common.rial')}`;
  const formattedToman = `${t('equal_to')} ${numberToPersian(rialToToman(value))} ${t('common.toman')}`;
  return `${getValueOrDash(formattedRial)} - ${formattedToman}`;
};

export const validateNationalCode = (nationalCode) => {
  if (!nationalCode) {
    return false;
  }

  if (nationalCode.length === 12) {
    if (/^\d{12}$/.test(nationalCode)) {
      return true;
    }
  }

  if (nationalCode.length !== 10) {
    return false;
  }

  if (!/^\d{10}$/.test(nationalCode)) {
    return false;
  }

  let sum = 0;
  const length = 10;

  for (let i = 0; i < length - 1; i++) {
    sum += parseInt(nationalCode[i]) * (length - i);
  }

  const r = parseInt(nationalCode[9]);
  const c = sum % 11;

  return (c < 2 && r === c) || (c >= 2 && 11 - c === r);
};

export function validateAccountNo(accountNo) {
  try {
    if (!accountNo || accountNo.trim() === '') {
      return true;
    }

    if (!/^\d+$/.test(accountNo)) {
      return false;
    }

    if (accountNo.length === 26) {
      accountNo = accountNo.slice(-13);
    }

    if (accountNo.length !== 13) {
      return false;
    }

    let checkDigit = true;
    const weights = [47, 43, 41, 37, 31, 29, 23, 19, 17, 13, 7, 5];
    let sumNum = 0;

    for (let i = 0; i < 12; i++) {
      sumNum += parseInt(accountNo[i]) * weights[i];
    }

    const remain = sumNum % 11;
    let regularRemain = 0;

    if (remain === 1) {
      checkDigit = false;
    } else {
      regularRemain = 11 - remain;
    }

    const intCheckDigit = regularRemain === 11 ? 0 : regularRemain;

    if (intCheckDigit !== parseInt(accountNo[12])) {
      checkDigit = false;
    }

    return checkDigit;
  } catch (e) {
    return false;
  }
}

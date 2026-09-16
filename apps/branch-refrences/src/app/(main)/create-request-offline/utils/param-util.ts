import { Obj } from '@branch-services/types';
import { removeLettersFromNumber, toApiDate } from '@branch-services/utils';

export const ParamUtil = {
  prepareHistoryParams: (params) => {
    const { filter, pagination } = params;
    const apiParams: Obj = {
      page: pagination?.page,
      size: pagination?.size,
    };

    if (filter?.accountNumber) {
      apiParams.accountNumber = filter?.accountNumber;
    }
    if (filter?.title) {
      apiParams.title = filter?.title;
    }
    if (filter?.fromAmount) {
      apiParams.fromAmount = +removeLettersFromNumber(filter?.fromAmount.toString());
    }

    if (filter.toAmount) {
      apiParams.toAmount = +removeLettersFromNumber(filter?.toAmount.toString());
    }
    if (filter?.fromDate) {
      apiParams.fromDate = toApiDate(filter?.fromDate);
    }
    if (filter?.toDate) {
      apiParams.toDate = toApiDate(filter?.toDate);
    }
    if (filter?.requestStatus) {
      apiParams.requestStatus = filter?.requestStatus.toString();
    }
    if (filter?.purpose) {
      apiParams.purpose = filter?.purpose.toString();
    }
    if (filter?.ssn) {
      apiParams.ssn = filter?.ssn.toString();
    }

    if (filter?.traceCode) {
      apiParams.traceCode = filter?.traceCode.toString();
    }

    if (filter?.description) {
      apiParams.description = filter?.description.toString();
    }
    if (filter.count) {
      apiParams.count = filter?.count;
    }
    if (filter.paymentType && filter?.paymentType !== 'ALL') {
      apiParams.paymentType = filter?.paymentType;
    }

    return apiParams;
  },
  prepareFileDetailsFilterParams: (params) => {
    const { fileDetailsFilter, id, ssn, pagination } = params;
    const apiParams: Obj = {
      page: pagination?.page,
      size: pagination?.size,
      id: id,
      ssn: ssn,
    };

    if (fileDetailsFilter?.destinationAccount) {
      apiParams.destinationAccount = fileDetailsFilter?.destinationAccount;
    }

    return apiParams;
  },
  prepareUserFileDetailsFilterParams: (params) => {
    const { fileDetailsFilter, requestId, pagination } = params;
    const apiParams: Obj = {
      page: pagination?.page,
      size: pagination?.size,
      requestId: requestId,
    };

    if (fileDetailsFilter?.destAccNameOrNumber) {
      apiParams.destAccNameOrNumber = fileDetailsFilter?.destAccNameOrNumber;
    }

    return apiParams;
  },
};
export default ParamUtil;

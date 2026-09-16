import { Obj } from '@branch-services/types';
import { removeLettersFromNumber, toIsoStringWithoutTimezone } from '@branch-services/utils';

const ParamUtil = {
  prepareParams: (params) => {
    const { requestDto, pagination } = params.params;

    const apiParams: Obj = {
      page: pagination?.page,
      size: pagination?.size,
    };

    if (requestDto?.fromDate) {
      apiParams.fromDate = toIsoStringWithoutTimezone(requestDto?.fromDate).date;
    }

    if (requestDto?.toDate) {
      apiParams.toDate = toIsoStringWithoutTimezone(requestDto?.toDate).date;
    }

    if (requestDto?.accountNumber) {
      apiParams.accountNumber = requestDto?.accountNumber;
    }

    if (requestDto?.requestStatus) {
      apiParams.requestStatus = requestDto?.requestStatus;
    }

    if (requestDto?.fromAmount) {
      apiParams.fromAmount = +removeLettersFromNumber(requestDto?.fromAmount.toString());
    }

    if (requestDto.toAmount) {
      apiParams.toAmount = +removeLettersFromNumber(requestDto?.toAmount.toString());
    }

    if (requestDto.paymentType && requestDto?.paymentType !== 'ALL') {
      apiParams.paymentType = requestDto?.paymentType;
    }
    if (requestDto.purpose) {
      apiParams.purpose = requestDto.purpose;
    }

    if (requestDto.branchCode) {
      apiParams.branchCode = requestDto.branchCode;
    }
    if (requestDto.description) {
      apiParams.description = requestDto?.description;
    }
    if (requestDto.traceCode) {
      apiParams.traceCode = requestDto?.traceCode;
    }

    return apiParams;
  },
};

export default ParamUtil;

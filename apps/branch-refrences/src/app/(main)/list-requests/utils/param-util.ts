import { Obj } from '@branch-services/types';
import { removeLettersFromNumber, toIsoStringWithoutTimezone } from '@branch-services/utils';

const ParamUtil = {
  prepareParams: (params) => {
    const { requestDto, pagination } = params.params;

    const apiParams: Obj = {
      page: pagination?.page,
      size: pagination?.size,
    };

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

    if (requestDto.description) {
      apiParams.description = requestDto?.description;
    }
    if (requestDto.ssn) {
      apiParams.ssn = requestDto?.ssn;
    }

    if (requestDto.purpose) {
      apiParams.purpose = requestDto?.purpose;
    }

    if (requestDto?.traceCode) {
      apiParams.traceCode = requestDto?.traceCode;
    }
    if (requestDto?.deposit_id) {
      apiParams.deposit_id = requestDto?.deposit_id;
    }
    if (requestDto?.fromDate) {
      apiParams.fromDate = toIsoStringWithoutTimezone(requestDto?.fromDate).date;
    }

    if (requestDto?.toDate) {
      apiParams.toDate = toIsoStringWithoutTimezone(requestDto?.toDate).date;
    }

    if (requestDto?.requestType) {
      apiParams.requestType = requestDto?.requestType;
    }

    if (requestDto?.depositType) {
      apiParams.depositType = requestDto?.depositType;
    }

    return apiParams;
  },
};

export default ParamUtil;

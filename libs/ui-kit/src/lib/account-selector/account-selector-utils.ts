import { AccountSelectorType, AccountType } from './account-selector-type';

export const mapAccountsToOptions = (items: AccountType[]) => {
  const result: AccountSelectorType[] = [];

  items.map((item) => {
    result.push({
      value: item.accountNumber,
      label: item.lastName?.trim(),
      companyName: item.companyName?.trim(),
      branchCode: item.branchCode,
      availableBalance: item?.availableBalance,
    });
  });

  return result;
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

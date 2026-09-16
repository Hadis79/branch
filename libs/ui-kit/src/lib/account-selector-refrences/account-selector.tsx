import { AutoCompleteProps, Input } from 'antd';
import Image from 'next/image';

import * as S from './account-selector.style';
import { ComponentRef, useCallback, useEffect, useRef, useState } from 'react';
import useAccountsQuery from './account-selector-query';
import { mapAccountsToOptions } from './account-selector-utils';
import { useTr } from '@branch-services/translation';
import { addThousandSeparator, handleKeyPress } from '@branch-services/utils';
import { Loading } from '../loading/loading';
import useAccountSelectorStore from './account-selector-store';
import { useDeBounce } from '@branch-services/hooks';
import useBalanceQuery from './account-balance-query';

export type CardNumberSelectorRefrencesProps = Omit<AutoCompleteProps, 'onSelect'> & {
  onSelect?: (value: string, option: any) => void;
  onClear?: () => void;
  onBalance?: (data: any) => void;
  legalId: string | null;
  onError?: (error: any | null) => void;
};

export const AccountSelectorRefrences = (props: CardNumberSelectorRefrencesProps) => {
  const {
    placeholder,
    size = 'large',
    legalId,
    onSelect: onSelectItem,
    onChange: baseOnChange,
    onBalance,
    onClear: handleOnClear,
    onError,
    allowClear = true,
    value: baseValue,
    ...rest
  } = props;

  const API_SEARCH_LENGTH_LIMIT = 3;
  const API_STOP_TYPING_SEARCH_DELAY = 500;
  const ACCOUNT_NUMBER_LENGTH = 13;

  const [t] = useTr();
  const [options, setOptions] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<any>(null);
  const debouncedSearch = useDeBounce(searchTerm, API_STOP_TYPING_SEARCH_DELAY);
  const [searchList, setSearchList] = useState<any>([]);
  const { data, isLoading, isError, error } = useAccountsQuery(legalId, debouncedSearch);
  const [value, setValue] = useState(baseValue);
  const inputRef = useRef<ComponentRef<typeof Input>>(null);
  const { selectedAccount, setSelectedAccount } = useAccountSelectorStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownOpenRef = useRef(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [balanceItem, setBalanceItem] = useState<any>(null);
  const {
    data: dataBalance,
    isLoading: isLoadingBalance,
    isError: isErrorBalance,
    error: errorBalance,
  } = useBalanceQuery(legalId, selectedAccount);

  useEffect(() => {
    if (legalId) {
      // setSelectedAccount(null);
      searchAccountNumber();
    } else {
      onClear();
    }
  }, [legalId, data]);

  useEffect(() => {
    if (onBalance) {
      onBalance(balanceItem);
    }
  }, [balanceItem]);

  //   useEffect(() => {
  //     setSearchList(data?.content ?? []);
  //   if (data?.content) {
  //     searchAccountNumber();
  //   }
  // }, [data]);

  //clear balance
  useEffect(() => {
    if (dataBalance === undefined && selectedAccount) {
      setSelectedAccount(null);
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      searchAccountNumber();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (dataBalance && onBalance) {
      onBalance(dataBalance?.availableBalance ?? null);
    }
  }, [dataBalance]);

  useEffect(() => {
    setValue(baseValue);
  }, [baseValue]);

  useEffect(() => {
    if (onError) {
      setOptions([]);
      onError(error);
    }
  }, [isError]);

  useEffect(() => {
    if (isErrorBalance && onError) {
      onError(errorBalance);
    }
  }, [isErrorBalance]);

  const onSearch = useCallback((searchedValue) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      const isValidSearchedValue = !isNaN(searchedValue) && !isNaN(parseFloat(searchedValue));

      if (searchedValue?.length < API_SEARCH_LENGTH_LIMIT) {
        setSearchTerm(null);
        return;
      }

      if (!isValidSearchedValue) return;

      setSearchTerm(searchedValue);
    }, API_STOP_TYPING_SEARCH_DELAY);
  }, []);

  useEffect(() => {
    const inputElement = inputRef.current?.input;
    if (inputElement) {
      const handlePaste = (event) => {
        event.preventDefault();
        const pastedText = event.clipboardData.getData('Text');
        const numericValue = pastedText.replace(/[^0-9۰-۹]/g, '').slice(0, ACCOUNT_NUMBER_LENGTH);

        onSearch(numericValue);
        setValue(numericValue);
        searchAccountNumber();
      };

      inputElement.addEventListener('paste', handlePaste);

      return () => {
        inputElement.removeEventListener('paste', handlePaste);
      };
    }
  }, [onSearch]);

  const searchAccountNumber = async () => {
    try {
      if (data && data?.content) {
        const transformedOptions = mapAccountsToOptions(data.content);
        const newOptions = makeSearchOptions(transformedOptions);
        if (data?.content?.length === 1) {
          const firstItem = newOptions[0]?.options[0];
          onSelect(firstItem?.value, firstItem);
          handleChange(firstItem?.value, firstItem);
          return;
        }
        if (dropdownOpenRef.current) {
          setDropdownOpen(true);
        }
        setOptions(newOptions);
      }
    } catch (error) {}
  };

  const renderTitle = (title: string) => <S.Title>{t(title)}</S.Title>;

  const renderEmptyView = () => (
    <S.Empty>
      <span className='title'>{t('message.empty')}</span>
      <i className='ri-inbox-fill' />
    </S.Empty>
  );

  const renderItem = (item) => {
    const { label, value: accountNumber, branchCode, availableBalance } = item;
    const assetPrefix = '/assets/meli-bank-logo.png';
    return {
      value: `${accountNumber} - ${t('field.branch_code')} ${branchCode}`,
      name: label,
      id: accountNumber,
      availableBalance,
      branchCode,
      label: (
        <S.ItemContainer>
          <div className={'item__header'}>
            <Image className='item__header-img' src={assetPrefix} alt={'meli-bank-logo'} width={28} height={28} />
            <div>
              <span className={'item__account-number-label'}>{accountNumber}</span>
              <div className={'item__branch'}>
                {t('uikit.account_opening_branch')}:<span className={'item__branch-code'}>{branchCode}</span>
              </div>
            </div>
          </div>
          <span className={'item__available-balance'}>
            {t('uikit.last_balance')}
            {addThousandSeparator(availableBalance)}
            {t('common.rial')}
          </span>
        </S.ItemContainer>
      ),
    };
  };

  const onSelect = (value, option) => {
    invokeOnSelect(value, option);
    setDropdownOpen(false);
  };
  const invokeOnSelect = (value, option) => {
    dropdownOpenRef.current = false;
    setSelectedAccount(option);
    // if (option?.availableBalance && onBalance) {
    //   option && onBalance(option?.availableBalance);
    // }

    if (option && dataBalance) {
      setBalanceItem(dataBalance?.availableBalance ?? null);
    } else {
      setBalanceItem(null);
    }

    if (onSelectItem) {
      const item = option
        ? {
            availableBalance: option?.availableBalance,
            value: option?.value,
            name: option?.name,
          }
        : null;

      onSelectItem(value, item);
    }
    setDropdownOpen(false);
  };

  function makeSearchOptions(list) {
    const searchOptionList: any[] = [];
    setSearchList(list);

    for (const item of list) {
      searchOptionList.push(renderItem(item));
    }

    const _options: any[] = [];

    if (searchOptionList.length > 0) {
      _options.push({
        label: renderTitle('common.account_list'),
        options: searchOptionList,
      });
    }

    if (_options.length === 0) {
      _options.push({
        label: renderEmptyView(),
      });
    }

    return _options;
  }

  const handleChange = (changedValue, option) => {
    setValue(changedValue);

    if (baseOnChange) {
      baseOnChange(changedValue, option);
    }
  };

  const onFocus = () => {
    if (!dropdownOpenRef.current) {
      dropdownOpenRef.current = true;
      setDropdownOpen(true);
    }

    if (!options?.length && (searchList || data?.content)) {
      setOptions(makeSearchOptions(searchList ?? data?.content));
    }
  };

  const onBlur = () => {
    if (value === '' || value === null) {
      invokeOnSelect(null, null);
    } else if (selectedAccount) {
      setValue(selectedAccount?.value);
    } else if (selectedAccount === null) {
      setValue(null);
      if (baseOnChange) {
        baseOnChange(null, []);
      }
    }
    dropdownOpenRef.current = false;
    setDropdownOpen(false);
    setSearchTerm(null);
  };

  const onClear = () => {
    setValue('');
    invokeOnSelect(null, null);

    if (handleOnClear) {
      handleOnClear();
    }
    setDropdownOpen(true);
  };

  return (
    <>
      <S.AutoCompleteWrapper
        placeholder={placeholder}
        value={value}
        style={{ width: '100%' }}
        options={options}
        onSearch={onSearch}
        onSelect={onSelect}
        allowClear={allowClear}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onClear={onClear}
        onKeyDown={handleKeyPress}
        open={dropdownOpen}
        disabled={isLoading}
        suffixIcon={isLoading ? <Loading size='small' /> : <i className='ri-arrow-down-s-line ri-1x' />}
        {...rest}
      >
        <Input size={size} ref={inputRef} />
      </S.AutoCompleteWrapper>
      {selectedAccount && dataBalance && (
        <S.InfoText>
          <span>{t('available_balance')}:</span>
          <span>{addThousandSeparator(dataBalance?.availableBalance)}</span>
          <span>{t('common.rial')}</span>
        </S.InfoText>
      )}
    </>
  );
};

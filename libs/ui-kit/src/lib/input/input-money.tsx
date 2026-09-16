import React, { ReactNode, useEffect, useState } from 'react';

import { useTr } from '@branch-services/translation';
import { addThousandSeparator, removeLettersFromNumber, numberToPersian, rialToToman } from '@branch-services/utils';

import { InputProps } from './input';
import { Text } from '../text/text';

import * as S from './input.style';

export type InputMoneyProps = InputProps & {
  showLetter?: boolean;
  subtitle?: ReactNode;
  onValue?: (value?: string, formattedValue?: string) => void;
};

export const InputMoney = (props: InputMoneyProps) => {
  const {
    children,
    addonAfter,
    value,
    onChange,
    onValue,
    allowClear = true,
    showLetter = true,
    subtitle,
    ...rest
  } = props;

  const [t] = useTr();
  const [formattedValue, setFormattedValue] = useState(value);

  const _addonAfter = addonAfter ?? t('common.rial');

  // console.log('money', value, formattedValue);

  useEffect(() => {
    if (value) {
      setFormattedValue(addThousandSeparator(removeLettersFromNumber(value?.toString())));
    }
  }, [value]);

  function getSubtitle() {
    if (!showLetter) return null;

    let _subtitle: ReactNode = '';
    const number = +removeLettersFromNumber(formattedValue?.toString() ?? '0');

    if (subtitle !== null && subtitle !== undefined) {
      _subtitle = subtitle;
    } else {
      _subtitle = `${numberToPersian(rialToToman(number))} ${t('common.toman')}`;
    }

    if (number.toString().length > 3 && number > 100) {
      return <Text variant='subtitle'>{_subtitle}</Text>;
    }

    return null;
  }

  function handleOnChange(event) {
    if (onChange) {
      onChange(event);
    }

    const newValue = removeLettersFromNumber(event.target.value);
    // Only allow numbers.
    if (newValue && !newValue.match(/^[0-9]+$/)) {
      return;
    }
    const formatted = addThousandSeparator(newValue);

    setFormattedValue(formatted);
    handleOnValue(newValue, formatted);
  }

  function handleOnValue(value, formatted) {
    if (onValue) {
      onValue(value, formatted);
    }
  }

  return (
    <S.InputMoneyWrapper>
      <S.InputWrapper
        value={formattedValue}
        addonAfter={_addonAfter}
        maxLength={19}
        allowClear={allowClear}
        onChange={handleOnChange}
        {...rest}
      >
        {children}
      </S.InputWrapper>
      {getSubtitle()}
    </S.InputMoneyWrapper>
  );
};

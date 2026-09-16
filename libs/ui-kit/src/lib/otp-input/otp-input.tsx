import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { Input, InputProps as AntInputProps, InputRef } from 'antd';

import { RE_DIGIT } from '@branch-services/utils';

export type OtpInputProps = Omit<AntInputProps, 'onChange'> & {
  children?: React.ReactNode;
  value?: string | null;
  valueLength?: number;
  focusable?: boolean;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  //max-width: 360px;
  column-gap: 2rem;

  /*! @noflip */
  direction: ltr;

  input {
    width: 100%;
    text-align: center;
    font-weight: bold;
    line-height: 1;
    border: none;
    border-bottom: 1px solid;
    border-radius: 0;
    box-shadow: none;
    background-color: transparent;
  }

  input:focus,
  input:focus-within {
    border: none;
    border-bottom: 1px solid;
    outline: none;
    box-shadow: none !important;
  }
`;

export const OtpInput = (props: OtpInputProps) => {
  const { children, value = '', valueLength = 5, focusable = true, onChange, onComplete, ...rest } = props;

  const inputRef = useRef<InputRef | null>(null);

  useEffect(() => {
    if (!focusable) return;

    inputRef.current?.focus();
  }, []);

  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }

    return items;
  }, [value, valueLength]);

  useEffect(() => {
    if (value && value.trim().length === valueLength) {
      if (onComplete) {
        onComplete(value);
      }
    } /* else if (state?.formValue?.errorMessage) {
      resetErrorMessageAction(dispatch);
    }*/
  }, [value]);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };
  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

    // only delete digit if next input element has no value
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : ' ';

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue?.trim());

      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(target);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue?.trim());
      target.blur();
    }
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    const targetValue = target.value;

    // keep the selection range position
    // if the same digit was typed
    target.setSelectionRange(0, targetValue.length);

    if (e.key !== 'Backspace' || targetValue !== '') {
      return;
    }

    focusToPrevInput(target);
  };
  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

    return target.focus(); // this line makes all inputs focusable , if you just want previous be active , remove this line and uncomment below

    /*
    // keep focusing back until previous input
    // element has value
    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
    */
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;
    const valueArray = value.split('');

    if (RE_DIGIT.test(key)) {
      valueArray[idx] = key;
      const newValue = valueArray.join('');
      onChange(newValue);

      if (newValue.length === valueLength && onComplete) {
        onComplete(newValue);
      }

      setTimeout(() => focusToNextInput(target), 10);
    }

    if (key === 'Backspace') {
      if (target.value) {
        valueArray[idx] = '';
        onChange(valueArray.join(''));
      } else {
        focusToPrevInput(target);
      }
    }
  };

  return (
    <Wrapper>
      {valueItems.map((digit, idx) => (
        <Input
          ref={focusable && idx === 0 ? inputRef : undefined}
          key={idx}
          type='text'
          inputMode='numeric'
          autoComplete='off'
          pattern='\d{1}'
          maxLength={valueLength}
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onFocus={inputOnFocus}
          size={rest?.size ?? 'large'}
          {...rest}
        />
      ))}
    </Wrapper>
  );
};

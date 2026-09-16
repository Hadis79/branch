import React, { forwardRef } from 'react';
import { InputProps as AntInputProps, InputRef } from 'antd';

import { InputMoney } from './input-money';
import * as S from './input.style';

export type InputProps = AntInputProps & {
  allow?: 'all' | 'number' | 'letter' | RegExp;
  children?: React.ReactNode;
};

const patternMap = {
  number: '[0-9۰-۹]',
  letter: '[a-zA-Zآ-ی ]',
};

export const InputBase = forwardRef<InputRef, InputProps>((props, ref) => {
  const { children, allow = 'all', ...rest } = props;

  function getPattern() {
    let pattern = '';
    if (allow === 'all') {
      pattern = '';
    } else if (allow === 'number') {
      pattern = patternMap.number;
    } else if (allow === 'letter') {
      pattern = patternMap.letter;
    } else if (allow instanceof RegExp) {
      pattern = allow.source;
    }
    return pattern;
  }

  // Determine pattern based on allow value
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const pattern = getPattern();
    if (pattern && !new RegExp(pattern).test(event.key)) {
      event.preventDefault();
    }
  };

  /*
    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      if (pattern) {
        event.preventDefault();

        const clipboardData = event.clipboardData || (window as any).clipboardData;
        const pastedText = clipboardData.getData('text/plain');

        // Filter out characters that don't match the pattern
        const filteredText = pastedText.split('').filter(char => new RegExp(pattern).test(char)).join('');

        // Insert the filtered text into the input
        document.execCommand('insertText', false, filteredText);
      }
    };
    */

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pattern = getPattern();
    if (pattern) {
      event.preventDefault();

      const clipboardData = event.clipboardData || (window as any).clipboardData;
      const pastedText = clipboardData.getData('text/plain');

      // Filter out characters that don't match the pattern
      const filteredText = pastedText
        .split('')
        .filter((char) => new RegExp(pattern).test(char))
        .slice(0, props?.maxLength) // Limit the length
        .join('');

      // Set the filtered text as the input value
      event.currentTarget.value = filteredText;

      // Trigger a change event to update the state or any other logic
      if (rest.onChange) {
        rest.onChange({
          ...event,
          target: {
            ...event.target,
            value: filteredText,
          } as any,
        });
      }
    }
  };

  return (
    <S.InputWrapper
      ref={ref}
      onKeyPress={allow !== 'all' ? handleKeyPress : undefined}
      onPaste={allow !== 'all' ? handlePaste : undefined}
      // onBlur={allow !== 'all' ? handleBlur : undefined}
      {...rest}
    >
      {children}
    </S.InputWrapper>
  );
});

type InputComponentType = React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>> & {
  Password: typeof S.PasswordWrapper;
  TextArea: typeof S.TextAreaWrapper;
  Search: typeof S.SearchWrapper;
  Group: typeof S.GroupWrapper;
  Money: typeof InputMoney;
};

InputBase.displayName = 'Input';

export const Input = InputBase as InputComponentType;

Input.Password = S.PasswordWrapper;

Input.TextArea = S.TextAreaWrapper;

Input.Search = S.SearchWrapper;

Input.Group = S.GroupWrapper;

Input.Money = InputMoney;

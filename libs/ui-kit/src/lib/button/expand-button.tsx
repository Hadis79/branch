import React from 'react';
import styled, { css } from 'styled-components';

import { Button, ButtonProps } from './button';

type onClickType = {
  event?: React.MouseEvent;
  info?: {
    open?: boolean;
  };
};

export type ExpandButtonProps = Omit<ButtonProps, 'type' | 'onClick'> & {
  open?: boolean;
  // onClick?: (event: onClickType['event'], info?: onClickType['info']) => void;
  onClick?: any;
  margin?: string;
  marginX?: string;
  marginY?: string;
  padding?: string;
  paddingX?: string;
  paddingY?: string;
};

const getSizeStyles = (size: ExpandButtonProps['size']) => {
  switch (size) {
    case 'small':
      return css`
        width: 24px;
        height: 24px;
      `;
    case 'large':
      return css`
        width: 40px;
        height: 40px;
      `;
    default:
      // middle or default case
      return css`
        width: 32px;
        height: 32px;
      `;
  }
};

const StyledExpandButton = styled(Button)<ExpandButtonProps>`
  background-color: ${(p) => p.theme.background};
  border-color: ${(p) => p.theme.background};
  margin: ${(p) => p.margin || `${p.marginY || 0} ${p.marginX || 0}`};
  padding: ${(p) => p.padding || `${p.paddingY || 0} ${p.paddingX || 0}`};
  ${(p) => getSizeStyles(p.size)};

  i {
    font-size: 1.4rem;
    margin: 0;
    font-weight: bold;
    color: ${(p) => p.theme.primary};
  }
`;

export const ExpandButton = (props: ExpandButtonProps) => {
  const { children, open = false, onClick, size = 'middle', ...rest } = props;

  function handleClick(e: React.MouseEvent, info?: onClickType['info']) {
    if (onClick) {
      onClick(e, { open: !open, ...info });
    }
  }

  return open ? (
    <StyledExpandButton icon={<i className='ri-arrow-up-s-line' />} onClick={handleClick} size={size} {...rest} />
  ) : (
    <StyledExpandButton icon={<i className='ri-arrow-down-s-line' />} onClick={handleClick} size={size} {...rest} />
  );
};

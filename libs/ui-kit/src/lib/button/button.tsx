import React from 'react';

import { ButtonProps as AntButtonProps } from 'antd';
import { StyledButton } from './button.style';

export type CustomButtonTypesProps = 'table' | 'primaryOutlined' | AntButtonProps['type'];

export type ButtonProps = Omit<AntButtonProps, 'type'> & {
  children?: React.ReactNode;
  type?: CustomButtonTypesProps;
  flex?: boolean;
};

export const Button = (props: ButtonProps) => {
  const { children, type, flex = true, ...rest } = props;

  let _type: any = type;

  const customTypes = ['table', 'primaryOutlined'];

  if (customTypes.includes(type as string)) {
    _type = 'default';
  }

  return (
    <StyledButton type={_type} org_type={type} flex={flex} {...rest}>
      {children}
    </StyledButton>
  );
};

// export default Button;

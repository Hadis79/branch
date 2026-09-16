import React from 'react';
import styled from 'styled-components';
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';

export type SelectProps = AntSelectProps & {
  // children?: React.ReactNode;
};

const StyledSelect = styled(AntSelect)`
  &.ant-select .ant-select-arrow i {
    color: ${(p) => p.theme.border};
  }
`;

export const Select = (props: SelectProps) => {
  const { loading = false, disabled = false, suffixIcon = null, ...rest } = props;

  let _suffix: {
    suffixIcon?: React.ReactNode;
  } = {};

  if (suffixIcon) {
    _suffix.suffixIcon = suffixIcon;
  } else if (loading) {
    _suffix = {};
  } else {
    _suffix.suffixIcon = <i className={`ri-arrow-down-s-line ri-1x`} />;
  }

  return <StyledSelect disabled={loading || disabled} loading={loading} {..._suffix} {...rest} />;
};

Select.Option = AntSelect.Option;

import React from 'react';
import styled from 'styled-components';
import { Switch as AntSwitch, SwitchProps as AntSwitchProps } from 'antd';

import { getRelatedColor, respondTo } from '@branch-services/utils';
import { useConfig } from '@branch-services/hooks';
import { ThemeID } from '@branch-services/types';

export type ThemeSwitchProps = AntSwitchProps & {
  children?: React.ReactNode;
};

const ThemeSwitchWrapper = styled(AntSwitch)`
  background-color: ${(p) => getRelatedColor(p.theme.id, p.theme.background, p.theme.onPrimary)}80 !important;
  box-shadow: 0 0 8px 0px rgba(139, 139, 139, 0.25);

  & .ant-switch {
    // background-color: ${(p) => p.theme.background}80  ;
  }

  & .ant-switch-handle::before {
    background-color: ${(p) => p.theme.onPrimary};
  }

  & .ant-switch-handle::before {
    //background-color: #b7bbe1 !important;
    //background-color: ${(p) => p.theme.background}90  !important;
  }

  & .ant-switch-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline-end: 1rem !important;
    padding-inline-start: 1rem !important;

    ${respondTo.down('md')} {
      padding-inline-end: 1.5rem !important;
      padding-inline-start: 1.5rem !important;
    }

    & .ant-switch-inner-checked {
      color: #faa627;
    }

    & .ant-switch-inner-unchecked {
      color: black;
    }

    & .ant-switch-inner-checked,
    & .ant-switch-inner-unchecked {
      width: 1.6rem;
      height: 1.6rem;
      margin-top: 0;

      /* ${respondTo.down('md')} {
        margin-top: -8px;
      } */
    }
  }
`;

export const ThemeSwitch = (props: ThemeSwitchProps) => {
  const { children, ...rest } = props;
  const { config, updateConfig } = useConfig();

  const handleOnChange = (val, event) => {
    updateConfig({
      ...config,
      themeId: config.themeId === ThemeID.DARK ? ThemeID.LIGHT : ThemeID.DARK,
    });

    if (props.onChange) {
      props.onChange(val, event);
    }
  };

  return (
    <ThemeSwitchWrapper
      {...rest}
      checkedChildren={<i className={'ri-sun-fill'} />}
      unCheckedChildren={<i className={'ri-moon-fill'} />}
      defaultChecked={config.themeId !== ThemeID.DARK}
      onChange={handleOnChange}
    />
  );
};

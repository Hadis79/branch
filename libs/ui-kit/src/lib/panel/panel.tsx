import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { boxShadow, cssVar } from '@branch-services/utils';
import { BasicComponentProps } from '@branch-services/types';

export type PanelProps = BasicComponentProps & {
  backgroundColor?: CSSProperties['backgroundColor'];
  margin?: CSSProperties['margin'];
  marginTop?: CSSProperties['marginTop'];
  marginRight?: CSSProperties['marginRight'];
  marginBottom?: CSSProperties['marginBottom'];
  marginLeft?: CSSProperties['marginLeft'];
  padding?: CSSProperties['padding'];
  paddingTop?: CSSProperties['paddingTop'];
  paddingRight?: CSSProperties['paddingRight'];
  paddingBottom?: CSSProperties['paddingBottom'];
  paddingLeft?: CSSProperties['paddingLeft'];
  radius?: string | 0;
  hasShadow?: boolean;
};

const StyledPanel = styled.section<PanelProps & { has_shadow: string }>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor || props.theme.surface};
  //border-radius: var(${cssVar.radius});
  padding: ${(props) => (props.padding === 0 ? '0' : props.padding || '2.4rem')};
  margin: ${(props) => props.margin || '0 auto'};
  border-radius: ${(props) => props.radius || `var(${cssVar.radius})`};
  ${(props) => props.paddingTop && `padding-top: ${props.paddingTop};`}
  ${(props) => props.paddingRight && `padding-right: ${props.paddingRight};`}
    ${(props) => props.paddingBottom && `padding-bottom: ${props.paddingBottom};`}
    ${(props) => props.paddingLeft && `padding-left: ${props.paddingLeft};`}
    ${(props) => props.marginTop && `margin-top: ${props.marginTop};`}
    ${(props) => props.marginRight && `margin-right: ${props.marginRight};`}
    ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom};`}
    ${(props) => props.marginLeft && `margin-left: ${props.marginLeft};`}
    ${(props) => props.has_shadow && `box-shadow: ${boxShadow};`}
`;

export const Panel = (props: PanelProps) => {
  const { children, hasShadow = true, ...rest } = props;

  return (
    <StyledPanel has_shadow={hasShadow.toString()} {...rest}>
      {children}
    </StyledPanel>
  );
};

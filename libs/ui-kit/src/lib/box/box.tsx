import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import { BasicComponentProps } from '@branch-services/types';

export type BoxProps = BasicComponentProps & {
  children?: React.ReactNode;
  display?: CSSProperties['display'];
  gap?: CSSProperties['gap'];
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  alignContent?: CSSProperties['alignContent'];
  flexWrap?: CSSProperties['flexWrap'];
  flexGrow?: CSSProperties['flexGrow'];
  flexShrink?: CSSProperties['flexShrink'];
  flexBasis?: CSSProperties['flexBasis'];
  alignSelf?: CSSProperties['alignSelf'];
  height?: CSSProperties['height'];
  maxHeight?: CSSProperties['maxHeight'];
  minHeight?: CSSProperties['minHeight'];
  width?: CSSProperties['width'];
  maxWidth?: CSSProperties['maxWidth'];
  minWidth?: CSSProperties['minWidth'];
  padding?: CSSProperties['padding'];
  paddingTop?: CSSProperties['paddingTop'];
  paddingRight?: CSSProperties['paddingRight'];
  paddingBottom?: CSSProperties['paddingBottom'];
  paddingLeft?: CSSProperties['paddingLeft'];
  margin?: CSSProperties['margin'];
  marginTop?: CSSProperties['marginTop'];
  marginRight?: CSSProperties['marginRight'];
  marginBottom?: CSSProperties['marginBottom'];
  marginLeft?: CSSProperties['marginLeft'];
  border?: CSSProperties['border'];
  borderTop?: CSSProperties['borderTop'];
  borderRight?: CSSProperties['borderRight'];
  borderBottom?: CSSProperties['borderBottom'];
  borderLeft?: CSSProperties['borderLeft'];
  borderRadius?: CSSProperties['borderRadius'];
  boxShadow?: CSSProperties['boxShadow'];
  backgroundColor?: CSSProperties['backgroundColor'];
  color?: CSSProperties['color'];
  fontSize?: CSSProperties['fontSize'];
  fontWeight?: CSSProperties['fontWeight'];
  lineHeight?: CSSProperties['lineHeight'];
  letterSpacing?: CSSProperties['letterSpacing'];
  textAlign?: CSSProperties['textAlign'];
  fillChildren?: boolean;
  visible?: boolean;
};

const StyledBox = styled.div<BoxProps & { $fill_children?: boolean }>`
  display: ${(props) => props.display ?? 'flex'};
  flex-direction: ${(props) => props.flexDirection ?? 'row'};
  gap: ${(props) => props.gap ?? ' 0.8rem'};
  justify-content: ${(props) => props.justifyContent ?? 'flex-start'};
  align-items: ${(props) => props.alignItems ?? 'stretch'};
  align-content: ${(props) => props.alignContent ?? 'stretch'};
  flex-wrap: ${(props) => props.flexWrap ?? 'nowrap'};
  flex-grow: ${(props) => props.flexGrow ?? 0};
  flex-shrink: ${(props) => props.flexShrink ?? 1};
  flex-basis: ${(props) => props.flexBasis ?? 'auto'};
  align-self: ${(props) => props.alignSelf ?? 'auto'};
  height: ${(props) => props.height ?? 'auto'};
  max-height: ${(props) => props.maxHeight ?? 'none'};
  min-height: ${(props) => props.minHeight ?? 'auto'};
  width: ${(props) => props.width ?? 'auto'};
  max-width: ${(props) => props.maxWidth ?? 'none'};
  min-width: ${(props) => props.minWidth ?? 'auto'};
  padding: ${(props) => props.padding ?? 0};
  margin: ${(props) => props.margin ?? 0};
  border: ${(props) => props.border ?? 'none'};
  border-radius: ${(props) => props.borderRadius ?? 0};
  box-shadow: ${(props) => props.boxShadow ?? 'none'};
  background-color: ${(props) => props.backgroundColor ?? 'transparent'};
  color: ${(props) => props.color ?? 'inherit'};
  font-size: ${(props) => props.fontSize ?? 'inherit'};
  font-weight: ${(props) => props.fontWeight ?? 'normal'};
  line-height: ${(props) => props.lineHeight ?? 'normal'};
  letter-spacing: ${(props) => props.letterSpacing ?? 'normal'};
  text-align: ${(props) => props.textAlign ?? 'inherit'};

  ${(props) => props.paddingTop && `padding-top: ${props.paddingTop};`}
  ${(props) => props.paddingRight && `padding-right: ${props.paddingRight};`}
  ${(props) => props.paddingBottom && `padding-bottom: ${props.paddingBottom};`}
  ${(props) => props.paddingLeft && `padding-left: ${props.paddingLeft};`}
  ${(props) => props.marginTop && `margin-top: ${props.marginTop};`}
  ${(props) => props.marginRight && `margin-right: ${props.marginRight};`}
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom};`}
  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft};`}
  ${(props) => props.borderTop && `border-top: ${props.borderTop};`}
  ${(props) => props.borderRight && `border-right: ${props.borderRight};`}
  ${(props) => props.borderBottom && `border-bottom: ${props.borderBottom};`}
  ${(props) => props.borderLeft && `border-left: ${props.borderLeft};`}

  ${(props) =>
    props.$fill_children
      ? css`
          & > * {
            width: 100%;
          }
        `
      : css`
          & > * {
            width: fit-content;
          }
        `}
`;

export const Box: React.FC<BoxProps> = (props) => {
  const { visible = true, children, fillChildren = true, ...rest } = props;
  return (
    visible && (
      <StyledBox {...rest} $fill_children={fillChildren}>
        {children}
      </StyledBox>
    )
  );
};

// export default Box;

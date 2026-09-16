import React from 'react';

import { StyledText } from './text.style';
import { Color, FontWeight } from '@branch-services/types';
import { useAppTheme } from '@branch-services/hooks';

type VariantType = 'head' | 'subhead' | 'title' | 'desc' | 'body' | 'subtitle';

export interface ITextProps {
  children?: React.ReactNode;
  variant?: VariantType;
  fontWeight?: FontWeight;
  fontSize?: string;
  color?: Color;
  margin?: string | 0;
  lineHeight?: number;
  className?: string;
  as?: React.ElementType;
}

export interface I$TextProps extends ITextProps {
  $fontWeight?: FontWeight;
  $fontSize?: string;
  $margin?: string | 0;
  $color?: Color;
  $lineHeight?: number;
}

export const Text: React.FC<ITextProps> = (props) => {
  const { children, as, variant, fontWeight, fontSize, color, margin = 0, lineHeight = 1.8, ...rest } = props;
  const Tag = as || 'p';
  const theme = useAppTheme();

  function getFontWeight(): FontWeight {
    if (variant && fontWeight) {
      throw Error("both variant and fontWeight shouldn't have value");
    }

    if (!variant && fontWeight) {
      return fontWeight;
    }

    switch (variant) {
      case 'head':
      case 'subhead':
        return 'bold';
      case 'title':
        return 500;
      case 'desc':
      case 'body':
        return 400;
      case 'subtitle':
        return 300;
      default:
        return 500;
    }
  }

  function getFontSize(): string {
    /*    if (variant && fontSize) {
      throw Error("both variant and fontSize shouldn't have value");
    }*/

    if (!variant && fontSize) {
      return fontSize;
    }

    switch (variant) {
      case 'head':
      case 'title':
        return '1.8rem';
      case 'subhead':
        return '1.7rem';
      case 'desc':
        return '1.6rem';
      case 'subtitle':
        return '1.2rem';
      case 'body':
      default:
        return '1.4rem';
    }
  }

  function getColor(): Color {
    if (color) {
      return color;
    }

    switch (variant) {
      case 'head':
        return theme.textPrimary;
      case 'subhead':
        return theme.textSecondary;
      case 'title':
        return theme.textPrimary;
      case 'desc':
        return theme.textSecondary;
      case 'body':
        return theme.textSecondary;
      case 'subtitle':
        return theme.textSecondary;
      default:
        return theme.textPrimary;
    }
  }

  return (
    <StyledText
      as={Tag}
      $fontWeight={getFontWeight()}
      $fontSize={getFontSize()}
      $color={getColor()}
      $margin={margin}
      $lineHeight={lineHeight}
      {...rest}
    >
      {children}
    </StyledText>
  );
};
// export default Text;

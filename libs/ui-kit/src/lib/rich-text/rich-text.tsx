import React from 'react';
import styled, { css } from 'styled-components';
import { Tooltip } from 'antd';

const StyledRichText = styled.div`
  display: flex;
  align-items: baseline;

  & > *:not(:first-child) {
    //background-color: brown;
    margin-left: 0.4rem;
  }

  & > *:last-child {
  }
`;

const StyledSpan = styled.span<any>`
  ${({ $isPrimary, theme }) =>
    $isPrimary
      ? css`
          color: ${theme.primary};
        `
      : css``}
`;

interface IRichTextProps {
  items: RichTextItemType[];
  fontSize?: string;
  fontWeight?: string | number;
  color?: string;
}

type RichTextItemType = {
  text: string;
  style?: Record<string, unknown>;
  isPrimary?: boolean;
  tooltipTitle?: string;
  onClick?: () => void;
};

const RichText: React.FC<IRichTextProps> = (props) => {
  const { items, fontSize, fontWeight, color } = props;

  return (
    <StyledRichText>
      {items.map((item: RichTextItemType, index: number) => {
        const child = (
          <StyledSpan
            style={{ fontSize: fontSize, fontWeight: fontWeight, color: color, ...item.style }}
            key={index}
            $isPrimary={item.isPrimary}
            onClick={handleClick}
          >
            {item.text}
          </StyledSpan>
        );

        function handleClick() {
          if (item.onClick) {
            item.onClick();
          }
        }

        return item.tooltipTitle ? (
          <Tooltip key={index} title={item.tooltipTitle} placement={'top'} arrow={true}>
            {child}
          </Tooltip>
        ) : (
          child
        );
      })}
    </StyledRichText>
  );
};

export default RichText;

import styled from 'styled-components';
import { I$TextProps } from './text';

export const StyledText = styled.p<I$TextProps>`
  /*  padding: 1rem;
  font-weight: 500;
  font-size: 1.4rem;
  height: 4rem;*/
  font-size: ${(p) => p.$fontSize};
  font-weight: ${(p) => p.$fontWeight};
  color: ${(p) => p.$color};
  margin: ${(p) => p.$margin};
  line-height: ${(p) => p.$lineHeight};
  white-space: break-spaces;
`;

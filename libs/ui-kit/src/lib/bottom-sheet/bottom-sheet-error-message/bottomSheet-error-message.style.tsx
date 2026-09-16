import styled from 'styled-components';
import { Box } from '../../box/box';

export const ErrorMessageContainer = styled(Box)`
  margin: 2rem 0;
  .text-box {
    span:nth-child(1) {
      font-weight: bold;
    }
    span:nth-child(2) {
      color: ${(p) => p.theme.textSecondary};
    }
  }
`;

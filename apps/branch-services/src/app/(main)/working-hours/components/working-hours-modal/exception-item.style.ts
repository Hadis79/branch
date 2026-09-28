import styled from 'styled-components';

import { Box } from '@branch-services/ui-kit';

export const ExceptionRow = styled(Box)`
  border: 0.1rem solid ${(p) => p.theme.border};
  border-radius: 0.6rem;
  padding: 1.2rem 1.6rem;

  .exception-title {
    cursor: pointer;
  }
`;

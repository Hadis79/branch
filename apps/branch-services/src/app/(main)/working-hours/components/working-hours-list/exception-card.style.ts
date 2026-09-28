import styled from 'styled-components';

import { Box } from '@branch-services/ui-kit';

export const Card = styled(Box)`
  border: 0.1rem solid ${(p) => p.theme.border};
  border-radius: 0.8rem;
  padding: 1.6rem 2.4rem;
  .exception-title {
    cursor: pointer;
  }
`;

import styled from 'styled-components';

import { Box } from '@branch-services/ui-kit';

export const Card = styled(Box).attrs({ justifyContent: 'space-between', alignItems: 'center' })`
  padding: 1.6rem 2.4rem;
  border: 0.1rem solid ${(p) => p.theme.border};
  border-radius: 0.8rem;
`;

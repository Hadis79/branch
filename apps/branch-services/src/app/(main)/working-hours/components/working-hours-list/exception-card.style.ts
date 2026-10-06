import styled from 'styled-components';

import { Box } from '@branch-services/ui-kit';

export const Card = styled(Box)<{ $expired: boolean }>`
  border: 0.1rem solid ${(p) => p.theme.border};
  border-radius: 0.8rem;
  padding: 1.6rem 2.4rem;

  .exception-title {
    cursor: pointer;
    color: ${(p) => (p.$expired ? p.theme.textSecondary : p.theme.textPrimary)};

    > i {
      color: ${(p) => (p.$expired ? p.theme.iconPrimary : p.theme.primary)};
      font-size: 18px;
    }
  }

  .delete-button {
    padding-inline: 0;

    i {
      font-size: 18px;
    }
  }
`;

export const Header = styled(Box)<{ $expanded: boolean }>`
  padding-bottom: ${(p) => (p.$expanded ? '1.6rem' : 0)};
  border-bottom: ${(p) => (p.$expanded ? `0.1rem solid ${p.theme.divider}` : 'none')};
`;

export const Title = styled.span`
  color: inherit;
  font-size: 1.4rem;
  font-weight: 500;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  padding-top: 1.6rem;

  @media (max-width: 48rem) {
    grid-template-columns: 1fr;
  }
`;

export const DetailItem = styled.div<{ $fullWidth: boolean }>`
  grid-column: ${(p) => (p.$fullWidth ? '1 / -1' : 'auto')};
  min-width: 0;
  min-height: 6.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  padding: 1.2rem 1.6rem;
  border-radius: 0.8rem;
  background-color: ${(p) => p.theme.backgroundLight};

  .detail-label {
    color: ${(p) => p.theme.textSecondary};
    font-size: 1.2rem;
  }

  .detail-value {
    color: ${(p) => p.theme.textPrimary};
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

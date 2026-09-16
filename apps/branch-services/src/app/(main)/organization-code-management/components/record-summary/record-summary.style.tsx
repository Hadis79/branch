import styled, { css } from 'styled-components';

export const Summary = styled.div<{ $compact: boolean }>`
  display: grid;
  grid-template-columns: minmax(16rem, 28%) 1fr;
  row-gap: 1.6rem;
  width: 100%;
  max-width: 64rem;
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.4rem;

  strong {
    font-weight: 500;
  }

  ${(props) =>
    props.$compact &&
    css`
      max-width: none;
      padding: 1.6rem;
      border-radius: 0.8rem;
      background: ${props.theme.backgroundLight};
      grid-template-columns: 1fr 1fr;

      strong {
        text-align: end;
      }
    `}
`;

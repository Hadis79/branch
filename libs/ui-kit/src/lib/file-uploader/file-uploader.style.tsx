import styled, { css } from 'styled-components';
import { cssVar } from '@branch-services/utils';

export const Root = styled.label<any>`
  cursor: pointer;
  text-align: center;
  display: flex;
  border: 1px dashed ${(p) => p.theme.primary};
  border-radius: var(${cssVar.radius});
  background-color: ${(p) => p.theme.background};

  &:hover {
    opacity: 0.8;
  }

  ${({ $isDragOver }) =>
    $isDragOver &&
    css`
      opacity: 1;
      border: 2px dashed ${(p) => p.theme.primaryDark};
    `}
`;

export const Content = styled.div<any>`
  width: ${(p) => p.width};
  min-height: ${(p) => p.height};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  & > *:first-child {
    margin-top: 1.2rem;
  }

  & > *:last-child {
    margin-bottom: 1.2rem;
  }
`;

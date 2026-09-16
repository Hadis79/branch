import styled from 'styled-components';

export const ErrorFallbackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 4rem); //2rem top margin  + 2rem bottom margin
  padding: 1rem 2rem;
  margin: 2rem;
  border-radius: 0.4rem;
  //text-align: center;
  align-items: center;
  background-color: ${({ theme }) => theme.errorBackground};
  //box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const ErrorTitle = styled.span`
  margin-top: 1.2rem;
  font-size: 1.8rem;
  font-weight: 600;
`;
export const ErrorDetail = styled.span`
  margin-top: 1.2rem;
  font-size: 1.5rem;
  font-weight: 400;
`;

import styled from 'styled-components';

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  background-color: ${(p) => p.theme.errorBackground};
  border-radius: 0.8rem;
  padding: 2.4rem;

  .heading {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-weight: 500;
    font-size: 1.6rem;
  }
  .desc {
    font-size: 1.4rem;
    text-align: start;
  }
  .error-info {
    display: inline-flex;
    align-items: center;
    gap: 1rem;

    .ant-btn {
      font-size: 1.4rem;
      padding-inline-start: 0;
      display: flex;
      flex-direction: row;
    }

    .error-text {
      color: ${(p) => p.theme.primary};
      font-weight: 500;
    }
  }
`;

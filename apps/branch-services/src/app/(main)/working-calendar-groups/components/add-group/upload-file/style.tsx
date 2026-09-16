import { Box } from '@branch-services/ui-kit';
import styled from 'styled-components';

export const UploadFileContainer = styled.div<{ fileRequiredError: boolean | null }>`
  .ant-upload {
    border: 1px dashed ${(p) => (p.fileRequiredError ? p.theme.error : p.theme.border)};
    border-radius: 10px;
  }
  .dragger-style {
    margin-bottom: 0;
  }
`;

export const UploadResult = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem;
  margin-top: 2.4rem;
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.backgroundLight};
`;
export const UploadedItem = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.1rem solid ${(p) => p.theme.border};
  border-radius: 0.6rem;
  padding: 0.8rem 1.6rem;
  color: ${(p) => p.theme.textPrimary};

  button {
    padding: 0;
    border: 0;
    color: inherit;
    background: transparent;
    cursor: pointer;
  }

  .uploaded-file {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 1.2rem;
      color: ${(p) => p.theme.primary};
    }
    i {
      color: ${(p) => p.theme.primary};
    }
  }
  span {
    width: auto;
  }
  &.similar_req_warning {
    color: ${(p) => p.theme.warning};
    border: 0.1rem solid ${(p) => p.theme.warning};
    background-color: #ffc97714;
    justify-content: flex-start;
    gap: 0.8rem;
    font-weight: 500;
  }
`;

export const UploadResultHeader = styled.div`
  display: flex;
  width: 100%;
  gap: 1.6rem;
  align-items: center;
  justify-content: space-between;

  > span {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-weight: 500;
  }

  i {
    color: ${({ theme }) => theme.success};
    font-size: 2rem;
  }

  button i {
    color: ${({ theme }) => theme.primary};
  }
`;

export const UploadResultRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.textSecondary};

  strong {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

export const UploadedUnits = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem 1.6rem;
  max-height: 16rem;
  padding: 1.6rem;
  margin: 0;
  overflow-y: auto;
  border-top: 0.1rem solid ${({ theme }) => theme.border};
`;

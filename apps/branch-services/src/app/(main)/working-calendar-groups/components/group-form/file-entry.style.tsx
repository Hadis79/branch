import { Box } from '@branch-services/ui-kit';
import styled from 'styled-components';

export const UploadFileContainer = styled.div`
  .ant-upload {
    border: 1px dashed ${(p) => p.theme.border};
    border-radius: 10px;
  }
  .dragger-style {
    margin-bottom: 0;
  }
  // antd only auto-styles standard inputs on error; the dragger's own border needs it explicitly
  .ant-form-item-has-error .ant-upload {
    border-color: ${(p) => p.theme.error};
  }
`;

export const SampleFileLink = styled.div`
  .ant-btn-link {
    height: auto;
    padding: 0;
    font-weight: 500;
    font-size: 1.4rem;
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
    width: fit-content;
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

  .ant-btn-link {
    width: auto;
    height: auto;
    padding: 0;
    white-space: nowrap;
    color: ${({ theme }) => theme.primary};

    i {
      color: ${({ theme }) => theme.primary};
    }
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

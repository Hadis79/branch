import { Upload } from 'antd';
import styled from 'styled-components';

export const StyledDragger = styled(Upload.Dragger)`
  .ant-upload-drag-container {
    display: flex !important;
    flex-direction: column;
  }

  .ant-upload-list-item-error {
    font-size: 1.4rem !important;
    margin-top: 1.6rem !important;
  }
  .ant-upload-list-item-actions .ant-btn svg {
    font-size: 1.8rem;
  }

  .ant-upload {
    border-radius: 1rem;
    background-color: ${(p) => p.theme.successBackground};

    :hover {
      border: 1px dashed ${(p) => p.theme.primary};
    }
  }

  .ant-upload-drag-hover {
    //background-color: chartreuse !important ;
  }

  .dragger-container {
    display: flex;
    padding: 0 1.6rem;
    align-items: center;

    i {
      font-size: 3.6rem;
      color: ${(p) => p.theme.primary};
    }

    .dragger-container__text {
      display: flex;
      flex-direction: column;
      padding: 0 1rem;
      text-align: start;

      .dragger-container__text__title {
        font-size: 1.4rem;
        font-weight: 500;
        color: ${(p) => p.theme.textPrimary};
      }

      .dragger-container__text__desc {
        font-size: 1.2rem;
        font-weight: normal;
        color: ${(p) => p.theme.textSecondary};
        margin-top: 0.4rem;
      }
    }
  }
`;

export const ErrorMessage = styled.div`
  color: ${(p) => p.theme.error};
  margin-top: 0.8rem;
`;

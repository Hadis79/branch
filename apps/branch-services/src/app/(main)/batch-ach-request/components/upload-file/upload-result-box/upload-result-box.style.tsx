import { Box } from '@branch-services/ui-kit';
import styled from 'styled-components';

export const UploadResultBoxContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-bottom: 2.4rem;
`;
export const UploadedItem = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.1rem solid ${(p) => p.theme.border};
  border-radius: 0.6rem;
  padding: 0.8rem 1.6rem;
  color: ${(p) => p.theme.textPrimary};
  .uploaded-file {
    display: flex;
    gap: 1rem;
    align-items: center;
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

export const ResultBoxContainer = styled(Box)`
  padding: 1.6rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${(p) => p.theme.border};
  background-color: ${(p) => p.theme.backgroundLight};
  display: flex;
  flex-direction: column;
  .detail-file-btn {
    i {
      color: ${(p) => p.theme.primary} !important;
    }
    font-size: 1.4rem;
    font-weight: 500;
    padding: 0;
    margin-right: -8px;
    column-gap: 0rem;
    .ant-btn-icon {
      margin-top: 0.8rem;
      .icon {
        font-size: 2.4rem;
      }
    }
  }
`;
export const TitleBox = styled.div<any>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    .head_title {
      display: flex;
      gap: 1rem;
    }
    .upload_details_link {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
      text-align: center;
      padding: 0.4rem;
      color: ${(p) => p.theme.primary};
      border-radius: 0.8rem;
      transition: all 0.1s linear;

      :hover {
        background-color: ${(p) => p.theme.primaryLight};
      }
      i {
        font-size: 2rem;
        color: ${(p) => p.theme.primary};
      }
    }

    .icon-title {
      font-size: 1.6rem;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    .upload_title_text {
      font-weight: 500;
    }
    .upload_view_detail {
      font-size: 1.4rem;
      font-weight: 500;
    }
    .upload_file_name {
      font-size: 1.6rem;
      color: ${(p) => (p.is_success ? p.theme.success : p.theme.error)};
    }
    i {
      font-size: 2.5rem;
      color: ${(p) => (p.is_success ? p.theme.success : p.theme.error)};
    }
  }
  .action-container {
    display: flex;
    align-items: center;
    gap: 1rem;

    & button {
      font-weight: 500;
    }

    i {
      cursor: pointer;
    }
  }
`;
export const DetailBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 1rem;
  margin-top: 1.6rem;
  font-size: 1.4rem;

  & .item-title {
    font-weight: normal;
    color: ${(props) => props.theme.textSecondary};
  }

  & .item-info {
    font-weight: 500;
    color: ${(props) => props.theme.textPrimary};
  }
`;
export const AmountWrapper = styled.span`
  unicode-bidi: plaintext;
`;

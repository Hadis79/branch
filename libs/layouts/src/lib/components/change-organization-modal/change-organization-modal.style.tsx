import styled from 'styled-components';
import { Modal } from 'antd';
import { hideScrollbar } from '@branch-services/utils';

export const ModalWrapper = styled(Modal)`
  & .ant-modal-content {
    padding: 1.6rem 3.2rem;
  }

  .ant-modal-header {
    //padding: 1.6rem 3.2rem;
    .ant-modal-title {
      font-size: 1.8rem;
    }
  }

  .ant-modal-body {
    //padding: 1.6rem 3.2rem;
  }

  .ant-modal-footer::before {
    content: '';
    display: block;
    border: 0.01px solid ${(p) => p.theme.divider};
    //margin-bottom: 10px;
    margin: 1.6rem -3.2rem;
  }

  .change-org-search-input {
    margin-top: 2.4rem;
    margin-bottom: 0;
  }

  .org-list-title {
    font-size: 1.6rem;
    font-weight: bold;
  }

  .ant-list-item {
    cursor: pointer;
  }

  .ant-list-split .ant-list-item {
    border-block-end: 1px solid ${(p) => p.theme.divider};
  }

  .ant-list-item-meta,
  .ant-list-item-meta-title {
    margin-block-end: 0 !important;
    font-size: 1.4rem !important;
    font-weight: 500;
    color: ${(p) => p.theme.textPrimary} !important;
  }

  .ant-list-item-meta-description {
    font-size: 1.3rem !important;
    font-weight: 400;
    color: ${(p) => p.theme.textSecondary} !important;
  }

  .ant-list-item-meta-avatar,
  .ant-list-item-extra {
    align-self: center;
  }

  .ant-list-items {
    height: 30rem;
    //min-height: 30rem;
    overflow-y: auto;

    ${hideScrollbar()}
  }

  .org-list-container {
    height: 100%;
  }
`;

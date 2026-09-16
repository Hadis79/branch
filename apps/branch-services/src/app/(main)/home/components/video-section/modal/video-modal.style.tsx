import { respondTo } from '@branch-services/utils';
import { Modal } from 'antd';
import styled from 'styled-components';

export const ModalStyled = styled(Modal)`
  .ant-modal-content {
    width: min(100%, 108.8rem);
    margin: 0 auto;
    .ant-modal-title {
      ${respondTo.down('sm')} {
        font-size: 1.4rem;
      }
    }
  }
`;
export const VideoStyled = styled.video`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 0.8rem;
  outline: 2px solid #e5e7eb;
  margin: 0 auto;
`;

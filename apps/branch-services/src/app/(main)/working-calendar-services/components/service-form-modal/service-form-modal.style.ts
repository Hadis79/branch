import { cssVar, respondTo } from '@branch-services/utils';
import styled from 'styled-components';

export const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
`;

export const RoundedBox = styled.div`
  .rounded-box-container {
    border: 1px solid ${(p) => p.theme.border};
    border-radius: var(${cssVar.radius});
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0.5rem 1.6rem;
    margin-top: 2.4rem;

    .rounded-box-container__layout__inline {
      .ant-form-item-label {
        padding: 0;

        ${respondTo.down('lg')} {
          flex: none !important;
        }
      }

      .ant-form-item {
        margin-bottom: 0;
        margin-top: 0;
      }

      .ant-form-item-row {
        flex-direction: initial;
        justify-content: space-between;
        align-items: center;
      }

      .ant-form-item-control {
        width: fit-content;
        display: flex;
        flex-direction: row-reverse;

        ${respondTo.down('lg')} {
          flex: none !important;
        }
      }
    }

    .ant-form-item-label {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .ant-form-item {
      margin: 0 !important;
    }
  }
`;

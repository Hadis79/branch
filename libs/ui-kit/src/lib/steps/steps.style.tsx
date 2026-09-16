import styled from 'styled-components';
import { cssVar, getRelatedColor, respondTo } from '@branch-services/utils';

export const SwitchWrapper = styled.div`
  .ant-steps {
    padding: 2.4rem 7.2rem;

    ${respondTo.down('xl')} {
      padding: 1.6rem;
    }
  }

  .ant-steps-item-title {
    font-size: 1.4rem;
    font-weight: normal;
    color: ${(p) => p.theme.textPrimary};
  }

  .ant-steps .ant-steps-item-finish .ant-steps-item-icon {
    background-color: ${(p) => p.theme.primaryLight};
    border: none;

    .anticon {
      color: ${(p) => getRelatedColor(p.theme.id, p.theme.primary, p.theme.textPrimary)};
      vertical-align: middle;
    }
  }

  .ant-steps-item-title:after {
    background-color: ${(p) => p.theme.border} !important;
  }
`;

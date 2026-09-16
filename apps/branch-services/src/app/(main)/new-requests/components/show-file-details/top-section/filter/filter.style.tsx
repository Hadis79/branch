import { Form } from 'antd';
import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';

export const FilterWrapper = styled(Form)`
  display: flex;
  flex-direction: column;

  ${respondTo.up('lg')} {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
  }

  .back-btn__box {
    display: flex;
    justify-content: flex-end;

    button {
      position: absolute;
      top: 15rem;
    }

    .back-icon {
      display: none;
    }

    /* Adjustments for md breakpoint */

    ${respondTo.down('md')} {
      button {
        display: none; /* Hide button */
      }

      .back-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        cursor: pointer;
      }
    }
  }

  .filter-form {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;

    label {
      white-space: nowrap;
    }

    ${respondTo.down('lg')} {
      flex-direction: row;
    }

    ${respondTo.down('md')} {
      flex-direction: column;
      align-items: stretch;
    }

    .ant-form-item {
      ${respondTo.up('md')} {
        flex-direction: column;
        align-items: stretch;
      }

      min-width: 100%;
    }
  }
`;

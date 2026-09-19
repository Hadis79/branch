import styled from 'styled-components';
import { Radio } from 'antd';

// Radio options drawn as cards; the checked one is highlighted
export const MethodOptions = styled(Radio.Group)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 1.6rem;

  .ant-radio-wrapper {
    align-items: flex-start;
    margin: 0;
    padding: 1.4rem 1.6rem;
    border: 0.1rem solid ${(props) => props.theme.border};
    border-radius: 0.8rem;
    background-color: ${(props) => props.theme.surface};
  }

  .ant-radio-wrapper-checked {
    border-color: ${(props) => props.theme.primary};
    background-color: ${(props) => props.theme.primaryLight};
  }
`;

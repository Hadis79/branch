import { Modal } from 'antd';
import { OptionProps } from 'antd/es/select';
import styled from 'styled-components';

export const ModalWrapper = styled(Modal)`
  .ant-modal-content {
    padding: 2rem 2.4rem;
    border-radius: 0.8rem;
  }
  .ant-modal-body {
    color: ${(props) => props.theme.textPrimary};
    font-size: 1.4rem;
    line-height: 2;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${(props) => props.theme.textPrimary};
  .ri-error-warning-fill {
    font-size: 2.4rem;
    color: ${(p) => p.theme.primary};
  }
`;

export const UnitCount = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-bottom: 4rem;
  color: ${(props) => props.theme.textPrimary};
`;

export const Description = styled.div`
  margin-bottom: 12px;

  font-size: 14px;
  font-weight: 500;
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Option = styled.div<OptionProps>`
  display: flex;
  align-items: flex-start;

  width: 100%;
  min-height: 72px;

  padding: 14px 16px;

  border: 1px solid ${({ selected }) => (selected ? '#008b91' : '#d9d9d9')};

  border-radius: 8px;

  background-color: ${({ selected }) => (selected ? '#f4ffff' : '#fff')};

  cursor: pointer;

  transition: all 0.2s ease;

  .ant-radio {
    margin-top: 2px;
  }

  &:hover {
    border-color: #008b91;
  }
`;

export const OptionContent = styled.div`
  display: flex;
  flex-direction: column;

  margin-right: 8px;
`;

export const OptionTitle = styled.div`
  margin-bottom: 4px;

  font-size: 14px;
  font-weight: 500;
`;

export const OptionDescription = styled.div`
  font-size: 12px;
  line-height: 1.8;

  color: #777;
`;

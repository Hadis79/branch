import { Modal } from 'antd';
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
  .ant-radio-group {
    width: 100%;
  }
`;

export const Title = styled.div<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${(props) => props.theme.textPrimary};
  .ri-error-warning-fill {
    font-size: 2.4rem;
    color: ${(p) => (p.$danger ? p.theme.error : p.theme.primary)};
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: 3.2rem;

  .ant-btn {
    min-width: 12rem;
  }
`;

export const UnitCount = styled.div`
  display: flex;
  gap: 1.6rem;
  color: ${(props) => props.theme.textPrimary};
`;

export const Description = styled.div`
  margin-bottom: 1.2rem;
  font-size: 1.4rem;
  font-weight: 500;
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Option = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-height: 7.2rem;
  padding: 1.4rem 1.6rem;
  border: 0.1rem solid ${({ $selected, theme }) => ($selected ? theme.primary : theme.border)};
  border-radius: 0.8rem;
  background-color: ${({ $selected, theme }) => ($selected ? theme.primaryLight : theme.surface)};
  cursor: pointer;
  transition: all 0.2s ease;

  .ant-radio {
    margin-top: 0.2rem;
  }

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const OptionContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.8rem;
`;

export const OptionTitle = styled.div`
  margin-bottom: 0.4rem;
  font-size: 1.4rem;
  font-weight: 500;
`;

export const OptionDescription = styled.div`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.secondary};
`;

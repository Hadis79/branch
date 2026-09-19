import styled from 'styled-components';

export const ModalTitle = styled.div<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  i {
    font-size: 2.2rem;
    color: ${(props) => (props.$danger ? props.theme.error : props.theme.primary)};
  }
`;

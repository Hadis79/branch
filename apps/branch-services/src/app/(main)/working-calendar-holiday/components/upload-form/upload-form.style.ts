import styled from 'styled-components';

export const UploadedFile = styled.div<{ $error: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.6rem;
  border: 0.1rem solid ${(props) => (props.$error ? props.theme.error : props.theme.border)};
  border-radius: 0.6rem;
  color: ${(props) => props.theme.primary};
`;

export const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem;
  border-radius: 0.6rem;
  background-color: ${(props) => props.theme.backgroundLight};
`;

import styled from 'styled-components';

export const UploadFileContainer = styled.div`
  .ant-upload {
    border: 1px dashed ${(p) => p.theme.border};
    border-radius: 10px;
  }
  .dragger-style {
    margin-bottom: 0;
  }
  // antd only auto-styles standard inputs on error; the dragger's own border needs it explicitly
  .ant-form-item-has-error .ant-upload {
    border-color: ${(p) => p.theme.error};
  }
`;

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

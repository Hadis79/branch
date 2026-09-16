import React from 'react';
import styled from 'styled-components';
import { Upload, UploadProps as AntUploadProps } from 'antd';

export type UploaderProps = AntUploadProps & {
  children?: React.ReactNode;
};

const StyledUploader = styled(Upload)``;

export const Uploader = (props: UploaderProps) => {
  const { children, ...rest } = props;

  return <StyledUploader {...rest}>{children}</StyledUploader>;
};

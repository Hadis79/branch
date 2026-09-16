import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Upload, UploadProps as AntUploadProps, Spin } from 'antd';

import { useTr } from '@branch-services/translation';
import { RcFile } from 'antd/es/upload';
import { isFileValid } from './util';
import { TFunction } from 'i18next';
import { MessageBox } from '../message-box/message-box';
import { ErrorMessage, StyledDragger } from './uploader.style';

type FileError = {
  message: any;
  invalidFileNames: string[];
  acceptedTypes: string[];
  maxCount?: number;
};

export type DraggerProps = AntUploadProps & {
  children?: React.ReactNode;
  displayDefaultChildren?: boolean;
  title?: string;
  description?: string;
  accept?: string;
  loading?: boolean;
  onError?: (error: FileError) => void;
};

// generate the error message
export const generateTypeErrorMessage = (invalidFileNames: string[], acceptedTypes: string[], t: TFunction) => ({
  txt: <span>{t('validation.valid_files', { accept: acceptedTypes })}</span>,
  description: (
    <ul>
      {invalidFileNames.map((item, index) => (
        <li key={index}>{`${t('validation.is_not_allowed', { fileName: item })}`}</li>
      ))}
    </ul>
  ),
  type: 'error',
  shouldTranslate: false,
});

export const Dragger = (props: DraggerProps) => {
  const [errorMessage, setErrorMessage] = useState<any>();
  const {
    children,
    displayDefaultChildren = false,
    title,
    description,
    accept,
    loading,
    onError,
    onDrop,
    beforeUpload,
    fileList: uploadedFiles = [],
    maxCount,

    ...rest
  } = props;
  const [t] = useTr();

  const acceptedTypes = useMemo(() => {
    return (accept?.replace(/\s+/g, '').toLowerCase().split(',') || []).map((type) => {
      return type.startsWith('.') ? type : `.${type}`;
    });
  }, [accept]);

  useEffect(() => {
    setErrorMessage(null);
  }, [uploadedFiles.length]);

  const validateFiles = useCallback(
    (files: File[]) => {
      const invalidFileNames: string[] = [];
      let isValid = true;
      files.forEach((file) => {
        const isValidFile = isFileValid(file, acceptedTypes); // Check if the file is valid

        if (!isValidFile) {
          invalidFileNames.push(file.name);
          isValid = false;
        }
      });

      if (invalidFileNames.length > 0) {
        const message = generateTypeErrorMessage(invalidFileNames, acceptedTypes, t);
        onError?.({ message, invalidFileNames, acceptedTypes });
        setErrorMessage(message);
      }

      return isValid;
    },
    [acceptedTypes, onError, t]
  );

  const handleBeforeUpload = (file: RcFile, fileList: RcFile[]) => {
    const isValid = validateFiles(fileList);

    if (maxCount && uploadedFiles.length + fileList.length > maxCount) {
      onError?.({
        message: { txt: t('validation.max_files_exceeded', { max: maxCount }), description: '', type: 'error' },
        invalidFileNames: [],
        acceptedTypes,
        maxCount,
      });
      setErrorMessage({ txt: t('validation.max_files_exceeded', { max: maxCount }), description: '', type: 'error' });
      return Upload.LIST_IGNORE; // Prevent the file from being uploaded
    }

    if (!isValid) {
      return Upload.LIST_IGNORE; // Prevent the file from being uploaded
    }
    return beforeUpload ? beforeUpload(file, fileList) : true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const files = Array.from(e.dataTransfer.files);

    if (maxCount && uploadedFiles.length + files.length > maxCount) {
      e.preventDefault(); // Prevent the default action if the number of files exceeds the limit
      onError?.({
        message: { txt: t('validation.max_files_exceeded', { max: maxCount }), description: '', type: 'error' },
        invalidFileNames: [],
        acceptedTypes,
        maxCount,
      });
      setErrorMessage({ txt: t('validation.max_files_exceeded', { max: maxCount }), description: '', type: 'error' });
      return;
    }

    const isValid = validateFiles(files);
    if (!isValid) {
      e.preventDefault(); // Prevent the default action if files are invalid
    }

    onDrop?.(e); // Call onDrop regardless of validation

    return isValid; // If `isValid` is false, files won't be added to the upload list
  };

  const defaultChildren = (
    <div className={'dragger-container'}>
      {loading ? <Spin /> : <i className='ri-file-upload-line' />}
      <div className='dragger-container__text'>
        <span className={'dragger-container__text__title'}>{title ?? t('uikit.dragger_title')}</span>
        <span className={'dragger-container__text__desc'}>{description ?? t('uikit.dragger_desc')}</span>
      </div>
    </div>
  );

  return (
    <>
      <StyledDragger
        {...rest}
        accept={accept}
        beforeUpload={handleBeforeUpload}
        maxCount={maxCount}
        // onDragEnter={handleDragEnter}
        // onDragLeave={handleDragLeave}

        onDrop={handleDrop}
        // className={isDragging ? 'dragging' : ''}
      >
        {displayDefaultChildren && defaultChildren}
        {children}
      </StyledDragger>
      {errorMessage && (
        <ErrorMessage>
          <MessageBox
            type={errorMessage.type}
            message={errorMessage.txt}
            subErrors={errorMessage.subErrors}
            description={errorMessage.description ?? ''}
            style={{ marginBottom: '2rem' }}
            closable
            className='error-msg'
            onClose={(e) => setErrorMessage(null)}
          />
        </ErrorMessage>
      )}
    </>
  );
};

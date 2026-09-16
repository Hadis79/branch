import React from 'react';

import { Nullable } from '@branch-services/types';

import { Button } from '../button/button';
import { Loading } from '../loading/loading';
import { Text } from '../text/text';

import * as S from './file-uploader.style';

export interface IFileUploadProps {
  id?: string;
  imageButton?: boolean;
  loading?: boolean;
  accept: string;
  hoverLabel?: Nullable<string>;
  dropLabel?: Nullable<string>;
  buttonTitle?: Nullable<string>;
  orLabel?: Nullable<string>;
  width?: string;
  height?: string;
  backgroundColor?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
}

const FileUploader: React.FC<IFileUploadProps> = ({
  id,
  accept,
  imageButton = false,
  loading = false,
  hoverLabel,
  dropLabel = 'Drop file here',
  buttonTitle = 'Choose File',
  orLabel = 'Or',
  width = '100%',
  height = '10rem',
  backgroundColor = 'unset',
  onChange,
  onDrop,
}) => {
  const _hoverLabel = hoverLabel ?? 'Click or drag to upload file';
  const [imageUrl, setImageUrl] = React.useState('');
  const [labelText, setLabelText] = React.useState<string>(_hoverLabel);
  const [isDragOver, setIsDragOver] = React.useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false);
  const fileTagId = id ?? 'file-upload';

  const stopDefaults = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dragEvents = {
    onMouseEnter: () => {
      setIsMouseOver(true);
    },
    onMouseLeave: () => {
      setIsMouseOver(false);
    },
    onDragEnter: (e: React.DragEvent) => {
      stopDefaults(e);
      setIsDragOver(true);
      setLabelText(dropLabel ?? '');
    },
    onDragLeave: (e: React.DragEvent) => {
      stopDefaults(e);
      setIsDragOver(false);
      setLabelText(_hoverLabel);
    },
    onDragOver: stopDefaults,
    onDrop: (e: React.DragEvent<HTMLElement>) => {
      stopDefaults(e);
      setLabelText(_hoverLabel);
      setIsDragOver(false);
      if (imageButton && e.dataTransfer.files[0]) {
        setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]));
      }
      onDrop(e);
    },
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (imageButton && event?.target?.files) {
      setImageUrl(URL.createObjectURL(event?.target?.files[0]));
    }

    onChange(event);
  };

  function getDragEvents() {
    if (loading) return null;
    return dragEvents;
  }

  return (
    <>
      <input
        id={fileTagId}
        onChange={handleChange}
        accept={accept}
        type='file'
        disabled={loading}
        style={{ display: 'none' }}
      />
      <S.Root htmlFor={fileTagId} {...getDragEvents()} $isDragOver={isDragOver}>
        <div
          style={{
            pointerEvents: 'none',
            width: width,
            minHeight: height,
            backgroundColor: backgroundColor,
          }}
        >
          {imageButton && (
            <div
              style={{
                position: 'absolute',
                minHeight: height,
                width: width,
              }}
            >
              <img
                alt={fileTagId}
                src={imageUrl}
                style={{
                  height: 'inherit',
                }}
              />
            </div>
          )}

          {!imageButton /*|| isDragOver || isMouseOver*/ && (
            <S.Content height={height} width={width}>
              {!loading ? (
                <>
                  <Text variant='title'>{labelText}</Text>

                  {!isDragOver && (
                    <>
                      <Text variant='title'>{orLabel}</Text>
                      <Button type={'primary'} style={{ padding: '0 3rem' }}>
                        {buttonTitle}
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <Loading />
              )}
            </S.Content>
          )}
        </div>
      </S.Root>
    </>
  );
};

export default FileUploader;

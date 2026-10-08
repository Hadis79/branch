import { Form, UploadProps } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, Dragger } from '@branch-services/ui-kit';

import SampleFileLink from './sample-file-link';
import UploadResult from './upload-result';
import * as S from './upload-form.style';
import type { UploadedHolidayFile } from '../../utils/types';
import { useAppTheme } from '@branch-services/hooks';

type FileEntryProps = {
  result: UploadedHolidayFile | null;
  loading: boolean;
  onUpload: UploadProps['customRequest'];
  onRemove: () => void;
  onViewDetails: () => void;
};

// Dragger until a file is parsed, then the upload result
const FileEntry = ({ result, loading, onUpload, onRemove, onViewDetails }: FileEntryProps) => {
  const [t] = useTr();
  const theme = useAppTheme();
  const form = Form.useFormInstance();
  // Set even when the upload later fails, so the attempted file stays visible under the error
  const selectedFile = Form.useWatch('file', { form, preserve: true })?.[0];

  if (result) return <UploadResult result={result} onRemove={onRemove} onViewDetails={onViewDetails} />;

  const handleRemoveFailed = () => {
    form.setFieldValue('file', undefined);
    onRemove();
  };

  return (
    <>
      <S.UploadFileContainer>
        <Form.Item
          name='file'
          className='dragger-style'
          valuePropName='fileList'
          getValueFromEvent={({ fileList }) => fileList}
          // Otherwise a fileList change (e.g. a failed upload) re-runs the required-file rule,
          // which passes and wipes out the upload error set on this field via form.setFields
          validateTrigger={[]}
          rules={[{ required: true, message: t('file_required') }]}
        >
          <Dragger
            displayDefaultChildren
            multiple={false}
            maxCount={1}
            showUploadList={false}
            accept='.xlsx,.xls'
            customRequest={onUpload}
            onRemove={onRemove}
            loading={loading}
            description={t('upload_description')}
          />
        </Form.Item>
      </S.UploadFileContainer>
      {/* The error (if any) is antd's own Form.Item help text, rendered just above this row */}
      {selectedFile && (
        <S.UploadedFile $error={false}>
          <Box className='uploaded-file' alignItems='center' gap='0.8rem' fillChildren={false}>
            <i className='ri-file-excel-line ri-2x' />
            <span className='file-name' title={selectedFile.name}>
              {selectedFile.name}
            </span>
          </Box>
          <Button
            type='link'
            onClick={handleRemoveFailed}
            aria-label={t('remove_uploaded_file')}
            style={{ color: theme.secondary, padding: 'unset' }}
          >
            <i className='ri-delete-bin-2-line' />
          </Button>
        </S.UploadedFile>
      )}
      <SampleFileLink />
    </>
  );
};

export default FileEntry;

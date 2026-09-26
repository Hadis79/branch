import { Form, UploadProps } from 'antd';

import { useTr } from '@branch-services/translation';
import { Button, Dragger } from '@branch-services/ui-kit';

import EntryLayout from './entry-layout';
import UploadResultBox from './upload-result-box';
import { SampleFileLink, UploadedItem, UploadFileContainer } from './file-entry.style';
import { GroupFormValues, UploadedGroupFile } from '../../utils/types';
import useDownloadSampleFileMutation from '../../queries/use-download-sample-file-mutation';

type FileEntryProps = {
  loading: boolean;
  onRemove: () => void;
  onUpload: UploadProps['customRequest'];
  uploadResult?: UploadedGroupFile;
  // The group's current unit count, shown in the result box until a new file is uploaded (edit only)
  previousUnitCount?: number;
  inlineName?: boolean;
  onViewNewFileDetails: () => void;
  onViewPreviousDetails: () => void;
};

const FileEntry = ({
  loading,
  onRemove,
  onUpload,
  uploadResult,
  previousUnitCount,
  inlineName,
  onViewNewFileDetails,
  onViewPreviousDetails,
}: FileEntryProps) => {
  const [t] = useTr();
  const downloadSample = useDownloadSampleFileMutation();
  const form = Form.useFormInstance<GroupFormValues>();
  // Set even when the upload later fails, so the attempted file stays visible under the error
  const selectedFile = Form.useWatch('file', { form, preserve: true })?.[0];

  const handleRemoveFailed = () => {
    form.setFieldValue('file', undefined);
    onRemove();
  };

  // Once a file is uploaded its result box replaces the dragger; until then, the dragger stays
  // available to upload a new file, and the group's current members show below it (edit only)
  return (
    <EntryLayout inlineName={inlineName}>
      {uploadResult ? (
        <UploadResultBox result={uploadResult} onRemove={onRemove} onViewDetails={onViewNewFileDetails} />
      ) : (
        <>
          <UploadFileContainer>
            <Form.Item
              name='file'
              className='dragger-style'
              valuePropName='fileList'
              getValueFromEvent={({ fileList }) => fileList}
              // Otherwise a fileList change (e.g. a failed upload) re-runs the required-file rule,
              // which passes and wipes out the upload error set on this field via form.setFields
              validateTrigger={[]}
              rules={[{ required: true, message: t('group_file_required') }]}
            >
              <Dragger
                displayDefaultChildren={true}
                multiple={false}
                maxCount={1}
                showUploadList={false}
                accept='.xlsx,.xls'
                customRequest={onUpload}
                onRemove={onRemove}
                loading={loading}
                description={t('or_click_to_upload')}
              />
            </Form.Item>
          </UploadFileContainer>
          {/* The error (if any) is antd's own Form.Item help text, rendered just above this row */}
          {selectedFile && (
            <UploadedItem>
              <span className='uploaded-file'>
                <i className='ri-file-excel-line ri-2x' />
                <span>{selectedFile.name}</span>
              </span>
              <button type='button' onClick={handleRemoveFailed} aria-label={t('remove_uploaded_file')}>
                <i className='ri-delete-bin-2-line ri-2x' />
              </button>
            </UploadedItem>
          )}
          <SampleFileLink>
            <Button
              htmlType='button'
              type='link'
              loading={downloadSample.isPending}
              onClick={() => downloadSample.mutate()}
            >
              {t('download_sample_file')}
              <i className='ri-download-line ri-2x'></i>
            </Button>
          </SampleFileLink>
          {previousUnitCount !== undefined && (
            <UploadResultBox
              previousUnitCount={previousUnitCount}
              onRemove={onRemove}
              onViewDetails={onViewPreviousDetails}
            />
          )}
        </>
      )}
    </EntryLayout>
  );
};

export default FileEntry;

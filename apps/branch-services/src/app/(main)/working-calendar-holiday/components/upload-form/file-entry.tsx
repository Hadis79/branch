import { Form, UploadProps } from 'antd';

import { useTr } from '@branch-services/translation';
import { Dragger } from '@branch-services/ui-kit';

import SampleFileLink from './sample-file-link';
import UploadResult from './upload-result';
import type { UploadedHolidayFile } from '../../utils/types';

type FileEntryProps = {
  result?: UploadedHolidayFile;
  loading: boolean;
  onUpload: UploadProps['customRequest'];
  onRemove: () => void;
  onViewDetails: () => void;
};

// Dragger until a file is parsed, then the upload result
const FileEntry = ({ result, loading, onUpload, onRemove, onViewDetails }: FileEntryProps) => {
  const [t] = useTr();

  if (result) return <UploadResult result={result} onRemove={onRemove} onViewDetails={onViewDetails} />;

  return (
    <>
      {/*
        Shown only while no file is parsed, so on submit it is always invalid: either nothing was chosen or the
        upload failed (the failed file stays in the list). Validated on submit only, not while uploading.
      */}
      <Form.Item
        name='file'
        valuePropName='fileList'
        getValueFromEvent={({ fileList }) => fileList}
        validateTrigger={[]}
        rules={[
          {
            validator: (_rule, fileList?: unknown[]) =>
              Promise.reject(new Error(t(fileList?.length ? 'upload_failed' : 'file_required'))),
          },
        ]}
      >
        <Dragger
          displayDefaultChildren
          multiple={false}
          maxCount={1}
          accept='.xlsx,.xls'
          customRequest={onUpload}
          onRemove={onRemove}
          loading={loading}
          description={t('upload_description')}
        />
      </Form.Item>
      <SampleFileLink />
    </>
  );
};

export default FileEntry;

import { Form, UploadProps } from 'antd';

import { useTr } from '@branch-services/translation';
import { Dragger } from '@branch-services/ui-kit';

import SampleFileLink from './sample-file-link';
import UploadResult, { PreviousFileInfo } from './upload-result';
import type { UploadedHolidayFile } from '../../utils/types';

type FileEntryProps = {
  result?: UploadedHolidayFile;
  // The year's existing holidays, shown in the same box until a new file replaces them (edit only)
  previous?: PreviousFileInfo;
  loading: boolean;
  onUpload: UploadProps['customRequest'];
  onRemove: () => void;
  onViewDetails: () => void;
};

// Dragger until a file is parsed or, for a year with existing holidays, the upload result box shows those instead
const FileEntry = ({ result, previous, loading, onUpload, onRemove, onViewDetails }: FileEntryProps) => {
  const [t] = useTr();

  if (result || (previous?.dayCount ?? 0) > 0) {
    return <UploadResult result={result} previous={previous} onRemove={onRemove} onViewDetails={onViewDetails} />;
  }

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
        style={{ marginBottom: 0 }}
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
          showUploadList={false}
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

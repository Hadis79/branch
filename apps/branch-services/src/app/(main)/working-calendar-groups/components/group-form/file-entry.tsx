import { Form, UploadProps } from 'antd';

import { useTr } from '@branch-services/translation';
import { Button, Dragger } from '@branch-services/ui-kit';

import EntryLayout from './entry-layout';
import UploadResultBox from './upload-result-box';
import { SampleFileLink, UploadFileContainer } from './file-entry.style';
import { UploadedGroupFile } from '../../utils/types';
import useDownloadSampleFileMutation from '../../queries/use-download-sample-file-mutation';

type FileEntryProps = {
  loading: boolean;
  onRemove: () => void;
  onUpload: UploadProps['customRequest'];
  uploadResult?: UploadedGroupFile;
  inlineName?: boolean;
};

const FileEntry = ({ loading, onRemove, onUpload, uploadResult, inlineName }: FileEntryProps) => {
  const [t] = useTr();
  const downloadSample = useDownloadSampleFileMutation();

  return (
    <EntryLayout inlineName={inlineName}>
      {uploadResult ? (
        <UploadResultBox result={uploadResult} onRemove={onRemove} />
      ) : (
        <>
          <UploadFileContainer>
            <Form.Item
              name='file'
              className='dragger-style'
              valuePropName='fileList'
              getValueFromEvent={({ fileList }) => fileList}
              rules={[{ required: true, message: t('group_file_required') }]}
            >
              <Dragger
                displayDefaultChildren={true}
                multiple={false}
                maxCount={1}
                accept='.xlsx,.xls'
                customRequest={onUpload}
                onRemove={onRemove}
                loading={loading}
                description={t('or_click_to_upload')}
              />
            </Form.Item>
          </UploadFileContainer>
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
        </>
      )}
    </EntryLayout>
  );
};

export default FileEntry;

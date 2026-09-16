import { Form, UploadProps } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Dragger, Input } from '@branch-services/ui-kit';

import SearchSVG from '../../../assets/media/search';
import { GroupFileUploadResponse } from '../../../utils/types';
import UploadResultBox from './upload-result-box';
import { UploadFileContainer } from './style';

type GroupFileEntryProps = {
  loading: boolean;
  onRemove: () => void;
  onUpload: UploadProps['customRequest'];
  uploadResult?: GroupFileUploadResponse;
};

const GroupFileEntry = ({ loading, onRemove, onUpload, uploadResult }: GroupFileEntryProps) => {
  const [t] = useTr();

  return (
    <Box>
      <Box flexDirection='column' width='100%'>
        <Form.Item
          name='name'
          label={t('group_name')}
          rules={[{ required: true, whitespace: true, message: t('group_name_required') }]}
        >
          <Input placeholder={t('group_name_placeholder')} />
        </Form.Item>
        {!uploadResult && (
          <UploadFileContainer fileRequiredError={null}>
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
                onRemove={() => onRemove()}
                loading={loading}
                description={t('or_click_to_upload')}
              />
            </Form.Item>
          </UploadFileContainer>
        )}
        {uploadResult && <UploadResultBox result={uploadResult} onRemove={onRemove} />}
      </Box>
      <SearchSVG />
    </Box>
  );
};

export default GroupFileEntry;

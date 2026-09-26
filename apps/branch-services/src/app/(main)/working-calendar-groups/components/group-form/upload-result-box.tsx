import { Form } from 'antd';

import { Box, Button, Text } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import { GroupFormValues, UploadedGroupFile } from '../../utils/types';
import { formatCount } from '../../utils/utils';
import * as S from './file-entry.style';

type UploadResultBoxProps = {
  result?: UploadedGroupFile;
  // The group's current unit count, shown until a new file replaces it
  previousUnitCount?: number;
  onRemove: () => void;
  onViewDetails: () => void;
};

// A newly uploaded file's summary, or the group's current members until one is uploaded
const UploadResultBox = ({ result, previousUnitCount, onRemove, onViewDetails }: UploadResultBoxProps) => {
  const [t] = useTr();
  const form = Form.useFormInstance<GroupFormValues>();
  const selectedFile = Form.useWatch('file', { form, preserve: true })?.[0];
  const fileName = selectedFile?.name;
  const unitCount = result?.unitCount ?? previousUnitCount ?? 0;

  const handleRemove = () => {
    form.setFieldValue('file', undefined);
    onRemove();
  };

  return (
    <Box flexDirection='column'>
      {result && (
        <S.UploadedItem>
          <span className='uploaded-file'>
            <i className='ri-file-excel-line ri-2x' />
            <span>{fileName}</span>
          </span>
          <button type='button' onClick={handleRemove} aria-label={t('remove_uploaded_file')}>
            <i className='ri-delete-bin-2-line ri-2x' />
          </button>
        </S.UploadedItem>
      )}
      <S.UploadResult>
        <S.UploadResultHeader>
          <span>
            <i className='ri-checkbox-circle-fill ' />
            {t(result ? 'file_information' : 'previous_members_information')}
          </span>
          <Button
            htmlType='button'
            type='link'
            onClick={onViewDetails}
            iconPosition='end'
            style={{ fontWeight: 500, fontSize: '1.4rem' }}
          >
            <i className='ri-arrow-left-s-line' />
            {t('view_file_details')}
          </Button>
        </S.UploadResultHeader>
        <S.UploadResultRow>
          <Text fontWeight={400}>{t('unit_count')}</Text>
          <Text fontWeight={500}>{formatCount(unitCount)}</Text>
        </S.UploadResultRow>
      </S.UploadResult>
    </Box>
  );
};

export default UploadResultBox;

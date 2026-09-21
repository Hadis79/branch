import { Form } from 'antd';

import { Box, Button, Text } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import useGroupStore from '../../store/use-widget-store';
import useWorkingCalendarGroupPage from '../../hooks/use-working-calendar-group-page';
import { GroupFormValues, UploadedGroupFile } from '../../utils/types';
import { formatCount } from '../../utils/utils';
import * as S from './file-entry.style';

type UploadResultBoxProps = {
  result: UploadedGroupFile;
  onRemove: () => void;
};

const UploadResultBox = ({ result, onRemove }: UploadResultBoxProps) => {
  const [t] = useTr();
  const { navigateToDetails } = useWorkingCalendarGroupPage();
  const setUploadedUnits = useGroupStore((state) => state.setUploadedUnits);
  const handleViewDetails = () => {
    setUploadedUnits(result.units);
    navigateToDetails();
  };
  const form = Form.useFormInstance<GroupFormValues>();
  const selectedFile = Form.useWatch('file', { form, preserve: true })?.[0];
  const fileName = selectedFile?.name;

  const handleRemove = () => {
    form.setFieldValue('file', undefined);
    onRemove();
  };

  return (
    <Box flexDirection='column'>
      <S.UploadedItem>
        <span className='uploaded-file'>
          <i className='ri-file-excel-line ri-2x' />
          <span>{fileName}</span>
        </span>
        <button type='button' onClick={handleRemove} aria-label={t('remove_uploaded_file')}>
          <i className='ri-delete-bin-2-line ri-2x' />
        </button>
      </S.UploadedItem>
      <S.UploadResult>
        <S.UploadResultHeader>
          <span>
            <i className='ri-checkbox-circle-fill ' />
            {t('file_information')}
          </span>
          <Button
            htmlType='button'
            type='link'
            onClick={handleViewDetails}
            iconPosition='end'
            style={{ fontWeight: 500, fontSize: '1.4rem' }}
          >
            <i className='ri-arrow-left-s-line' />
            {t('view_file_details')}
          </Button>
        </S.UploadResultHeader>
        <S.UploadResultRow>
          <Text fontWeight={400}>{t('unit_count')}</Text>
          <Text fontWeight={500}>{formatCount(result.unitCount)}</Text>
        </S.UploadResultRow>
      </S.UploadResult>
    </Box>
  );
};

export default UploadResultBox;

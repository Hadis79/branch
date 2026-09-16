import { Form } from 'antd';
import useGroupStore from '../../../store/use-widget-store';
import useWorkingCalendarGroupPage from '../../../hooks/use-working-calendar-group-page';
import { WorkingCalendarGroupPage } from '../../../utils/constants';

import { Box, Button } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import { AddGroupFormValues, GroupFileUploadResponse } from '../../../utils/types';
import * as S from './style';
import { useAppTheme } from '@branch-services/hooks';

type UploadResultBoxProps = {
  result: GroupFileUploadResponse;
  onRemove: () => void;
};

const UploadResultBox = ({ result, onRemove }: UploadResultBoxProps) => {
  const [t] = useTr();
  const { navigateTo } = useWorkingCalendarGroupPage();
  const setUploadedUnits = useGroupStore((state) => state.setUploadedUnits);
  const handleViewDetails = () => {
    setUploadedUnits(result.units ?? []);
    navigateTo(WorkingCalendarGroupPage.DETAILS);
  };
  const { textTerritory, primary } = useAppTheme();
  const form = Form.useFormInstance<AddGroupFormValues>();
  const selectedFile = Form.useWatch('file', { form, preserve: true })?.[0];
  const fileName = selectedFile?.name;
  const unitCount = result.unitCount ?? result.totalRecords ?? result.size ?? result.units?.length ?? 0;

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
        <button
          color={textTerritory}
          style={{ width: 'fit-content' }}
          type='button'
          onClick={handleRemove}
          aria-label={t('remove_uploaded_file')}
        >
          <i className='ri-delete-bin-2-line ri-2x' />
        </button>
      </S.UploadedItem>
      <S.UploadResult>
        <S.UploadResultHeader>
          <span>
            <i className='ri-checkbox-circle-fill' />
            {t('file_information')}
          </span>
          <Button
            htmlType='button'
            type='link'
            onClick={handleViewDetails}
            icon={<i className='ri-arrow-left-s-line' />}
            iconPosition='end'
            style={{ padding: 0, height: 'auto', width: 'auto', whiteSpace: 'nowrap', color: primary }}
          >
            {t('view_file_details')}
          </Button>
        </S.UploadResultHeader>
        <S.UploadResultRow>
          <span>{t('unit_count')}</span>
          <strong>{unitCount.toLocaleString('fa-IR')}</strong>
        </S.UploadResultRow>
      </S.UploadResult>
    </Box>
  );
};

export default UploadResultBox;

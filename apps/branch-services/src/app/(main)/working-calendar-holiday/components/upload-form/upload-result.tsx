import { useAppTheme } from '@branch-services/hooks';
import { useTr } from '@branch-services/translation';
import { Box, Button, Text } from '@branch-services/ui-kit';

import type { UploadedHolidayFile } from '../../utils/types';
import { formatCount } from '../../utils/utils';

import * as S from './upload-form.style';
import { Form } from 'antd';

type UploadResultProps = {
  result: UploadedHolidayFile;
  onRemove: () => void;
  onViewDetails: () => void;
};

// Uploaded file and its summary; a file with duplicate rows is shown as an error and cannot be used
const UploadResult = ({ result, onRemove, onViewDetails }: UploadResultProps) => {
  const [t] = useTr();
  const theme = useAppTheme();
  const hasDuplicates = result.duplicateCount > 0;
  const form = Form.useFormInstance();
  const fileName = form.getFieldValue('file');
  const rows = hasDuplicates
    ? [
        ['file_type', result.fileType],
        ['day_count', formatCount(result.dayCount)],
        ['duplicate_count', formatCount(result.duplicateCount)],
      ]
    : [['day_count', formatCount(result.dayCount)]];
  return (
    <Box flexDirection='column' gap='1.2rem'>
      <S.UploadedFile $error={hasDuplicates}>
        <span className='uploaded-file'>
          <span>{fileName[0]?.name}</span>
          <i className='ri-file-excel-line ri-2x' />
        </span>
        <Button
          type='link'
          icon={<i className='ri-delete-bin-2-line' />}
          onClick={onRemove}
          aria-label={t('remove_uploaded_file')}
        />
      </S.UploadedFile>
      {hasDuplicates && (
        <Text as='span' fontSize='1.2rem' fontWeight={400} color={theme.error}>
          {t('duplicate_rows_error')}
        </Text>
      )}
      <S.FileInfo>
        <Box justifyContent='space-between' alignItems='center' fillChildren={false}>
          <Text as='span' color={hasDuplicates ? theme.error : theme.success}>
            <i className={hasDuplicates ? 'ri-close-circle-fill' : 'ri-checkbox-circle-fill'} />{' '}
            <Text as='span'>{t('file_information')}</Text>
          </Text>
          {!hasDuplicates && (
            <Button
              type='link'
              icon={<i className='ri-arrow-left-s-line' />}
              iconPosition='end'
              onClick={onViewDetails}
            >
              {t('view_file_details')}
            </Button>
          )}
        </Box>
        {rows.map(([label, value]) => (
          <Box key={label} justifyContent='space-between' fillChildren={false}>
            <Text as='span' fontWeight={400} color={theme.textSecondary}>
              {t(label)}
            </Text>
            <Text as='span'>{value}</Text>
          </Box>
        ))}
      </S.FileInfo>
    </Box>
  );
};

export default UploadResult;

import { useState } from 'react';
import { Radio } from 'antd';

import { useAppTheme } from '@branch-services/hooks';
import { useTr } from '@branch-services/translation';
import { Text } from '@branch-services/ui-kit';

import HolidayModal from '../holiday-modal/holiday-modal';
import useHolidayPage from '../../hooks/use-holiday-page';
import { HolidayPage } from '../../utils/constants';

import * as S from './create-method-modal.style';

const METHODS = [
  { page: HolidayPage.UPLOAD, title: 'method_upload', description: 'method_upload_description' },
  { page: HolidayPage.MANUAL, title: 'method_manual', description: 'method_manual_description' },
] as const;

type CreateMethodModalProps = {
  open: boolean;
  onCancel: () => void;
};

const CreateMethodModal = ({ open, onCancel }: CreateMethodModalProps) => {
  const [t] = useTr();
  const theme = useAppTheme();
  const { navigateTo } = useHolidayPage();
  const [method, setMethod] = useState<HolidayPage>(HolidayPage.UPLOAD);

  const handleContinue = () => {
    onCancel();
    navigateTo(method);
  };

  return (
    <HolidayModal
      open={open}
      title={t('create_method_title')}
      confirmText={t('continue')}
      onConfirm={handleContinue}
      onCancel={onCancel}
    >
      <Text as='span'>{t('create_method_question')}</Text>
      <S.MethodOptions value={method} onChange={(event) => setMethod(event.target.value)}>
        {METHODS.map(({ page, title, description }) => (
          <Radio key={page} value={page}>
            <Text fontWeight={500}>{t(title)}</Text>
            <Text fontSize='1.2rem' fontWeight={400} color={theme.secondary}>
              {t(description)}
            </Text>
          </Radio>
        ))}
      </S.MethodOptions>
    </HolidayModal>
  );
};

export default CreateMethodModal;

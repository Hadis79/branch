import { useState } from 'react';

import { Radio } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button } from '@branch-services/ui-kit';

import * as S from './style';
import { WorkingCalendarGroupPage } from '../../utils/constants';
import useWorkingCalendarGroupPage from '../../hooks/use-working-calendar-group-page';
import useGroupStore from '../../store/use-widget-store';

type EditMode = 'upload-file' | 'manual';

type EditModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: (mode: EditMode) => void;
  confirmLoading?: boolean;
};

const EditModal = ({ open, onCancel }: EditModalProps) => {
  const [t] = useTr();
  const { navigateTo } = useWorkingCalendarGroupPage();
  const selectedGroupId = useGroupStore((state) => state.selectedGroupId);

  const [selectedMode, setSelectedMode] = useState<EditMode>('upload-file');

  const handleConfirm = () => {
    navigateTo(WorkingCalendarGroupPage.EDIT);
  };

  return (
    <S.ModalWrapper
      centered
      width={544}
      title={
        <S.Title>
          <i className='ri-error-warning-fill' />
          <span>ویرایش گروه</span>
        </S.Title>
      }
      open={open}
      onCancel={onCancel}
      closable={false}
      maskClosable={false}
      keyboard={false}
      footer={null}
    >
      <S.Description>نحوه ویرایش گروه را انتخاب کنید:</S.Description>

      <Radio.Group
        value={selectedMode}
        onChange={(event) => setSelectedMode(event.target.value)}
        style={{ width: '100%' }}
      >
        <S.Options>
          <S.Option selected={selectedMode === 'upload-file'} onClick={() => setSelectedMode('upload-file')}>
            <Radio value='upload-file' />

            <S.OptionContent>
              <S.OptionTitle>جایگزینی کامل اعضا</S.OptionTitle>

              <S.OptionDescription>
                لیست فعلی اعضای گروه حذف شده و اعضای موجود در فایل جدید جایگزین می‌شوند.
              </S.OptionDescription>
            </S.OptionContent>
          </S.Option>

          <S.Option selected={selectedMode === 'manual'} onClick={() => setSelectedMode('manual')}>
            <Radio value='manual' />

            <S.OptionContent>
              <S.OptionTitle>ویرایش دستی لیست</S.OptionTitle>

              <S.OptionDescription>امکان حذف یا اضافه کردن واحدها به لیست فعلی گروه وجود دارد.</S.OptionDescription>
            </S.OptionContent>
          </S.Option>
        </S.Options>
      </Radio.Group>

      <Box justifyContent='flex-end' gap='1.2rem' marginTop='3.2rem'>
        <Button htmlType='button' type='primaryOutlined' onClick={onCancel}>
          {t('button.cancel')}
        </Button>

        <Button htmlType='button' type='primary' onClick={handleConfirm}>
          ادامه
        </Button>
      </Box>
    </S.ModalWrapper>
  );
};

export default EditModal;

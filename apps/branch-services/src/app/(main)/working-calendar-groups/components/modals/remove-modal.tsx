import { MouseEvent } from 'react';

import { useTr } from '@branch-services/translation';
import { Box, Button, Text } from '@branch-services/ui-kit';

import * as S from './style';
import useDeleteGroupMutation from '../../queries/use-remove-group-mutation';

type RemoveModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLoading?: boolean;
  groupName?: string;
};

const RemoveModal = ({ open, onCancel, onConfirm }: RemoveModalProps) => {
  const [t] = useTr();
  const { isPending } = useDeleteGroupMutation();

  const handleConfirmClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onConfirm();
  };

  return (
    <S.ModalWrapper
      centered
      width='54.4rem'
      title={<S.Title>حذف گروه - شعب کشیک قم</S.Title>}
      open={open}
      onCancel={onCancel}
      closable={false}
      maskClosable={false}
      keyboard={false}
      footer={null}
    >
      <Box flexDirection='column' marginBottom={'4rem'}>
        <span>آیا از حذف گروه اطمینان دارید؟</span>
        <Text fontWeight={500}>با حذف این گروه، قوانین اعمال‌شده بر گروه مذکور حذف خواهدشد.</Text>
      </Box>
      <Box justifyContent='flex-end'>
        <Button
          style={{ width: '20%' }}
          htmlType='button'
          loading={isPending}
          type='primaryOutlined'
          onClick={onCancel}
        >
          {t('button.cancel')}
        </Button>
        <Button
          style={{ width: '20%' }}
          htmlType='button'
          loading={isPending}
          type='primary'
          danger
          onClick={handleConfirmClick}
        >
          {t('button.delete')}
        </Button>
      </Box>
    </S.ModalWrapper>
  );
};

export default RemoveModal;

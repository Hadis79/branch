import { useTr } from '@branch-services/translation';
import { Text } from '@branch-services/ui-kit';

import GroupModal from './group-modal';
import * as S from './style';

type RemoveModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLoading?: boolean;
  groupName?: string;
};

const RemoveModal = ({ groupName, ...modalProps }: RemoveModalProps) => {
  const [t] = useTr();

  return (
    <GroupModal {...modalProps} danger title={t('remove_group_title', { groupName })} confirmText={t('button.delete')}>
      <S.Description>
        <span>{t('remove_group_question')}</span>
        <br />
        <Text fontWeight={500}>{t('remove_group_description')}</Text>
      </S.Description>
    </GroupModal>
  );
};

export default RemoveModal;

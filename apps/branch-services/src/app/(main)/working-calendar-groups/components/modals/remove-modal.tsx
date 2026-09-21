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
    <GroupModal
      type='remove'
      {...modalProps}
      danger
      title={t('remove_group_title', { groupName })}
      confirmText={t('button.delete')}
    >
      <S.Description>
        <Text fontWeight={400}>{t('remove_group_question')}</Text>
        <Text fontWeight={500}>{t('remove_group_description')}</Text>
      </S.Description>
    </GroupModal>
  );
};

export default RemoveModal;

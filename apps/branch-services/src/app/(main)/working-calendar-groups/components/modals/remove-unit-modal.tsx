import { useTr } from '@branch-services/translation';
import { Text } from '@branch-services/ui-kit';

import GroupModal from './group-modal';
import * as S from './style';

type RemoveUnitModalProps = {
  open: boolean;
  unitName?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const RemoveUnitModal = ({ unitName, ...modalProps }: RemoveUnitModalProps) => {
  const [t] = useTr();

  return (
    <GroupModal
      type='remove'
      {...modalProps}
      danger
      title={t('remove_unit_title', { unitName })}
      confirmText={t('button.delete')}
    >
      <S.Description>
        <Text fontWeight={500}>{t('remove_unit_question')}</Text>
        <Text fontWeight={500}>{t('remove_unit_description')}</Text>
      </S.Description>
    </GroupModal>
  );
};

export default RemoveUnitModal;

import { useTr } from '@branch-services/translation';

import GroupModal from './group-modal';
import * as S from './style';
import { EDIT_MODE_LABELS, EntryMode } from '../../utils/constants';
import type { GroupFormVariant } from '../../utils/types';
import { formatCount } from '../../utils/utils';

type ConfirmModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLoading?: boolean;
  groupName?: string;
  unitCount: number;
  variant?: GroupFormVariant;
  entryMode: EntryMode;
};

const ConfirmModal = ({ groupName, unitCount, variant = 'create', entryMode, ...modalProps }: ConfirmModalProps) => {
  const [t] = useTr();
  const isEdit = variant === 'edit';
  const description = isEdit ? EDIT_MODE_LABELS[entryMode].confirm : 'confirm_create_group_description';

  return (
    <GroupModal
      {...modalProps}
      type='create'
      title={t(`confirm_${variant}_group_title`)}
      confirmText={t(isEdit ? 'save_changes' : 'button.confirm')}
    >
      <S.Description>
        {t(`confirm_${variant}_group_question`, { groupName })}
        <br />
        {t(description)}
      </S.Description>
      {!isEdit && (
        <S.UnitCount>
          <span>{t('unit_count')}:</span>
          <span>{formatCount(unitCount)}</span>
        </S.UnitCount>
      )}
    </GroupModal>
  );
};

export default ConfirmModal;

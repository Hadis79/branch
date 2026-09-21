import { useState } from 'react';

import { Radio } from 'antd';

import { useTr } from '@branch-services/translation';

import GroupModal from './group-modal';
import * as S from './style';
import { EDIT_MODE_LABELS, EntryMode, WorkingCalendarGroupPage } from '../../utils/constants';
import useWorkingCalendarGroupPage from '../../hooks/use-working-calendar-group-page';
import useGroupStore from '../../store/use-widget-store';
import type { GroupListItem } from '../../utils/types';

type EditModalProps = {
  open: boolean;
  onCancel: () => void;
  group: GroupListItem | null;
};

const EditModal = ({ open, onCancel, group }: EditModalProps) => {
  const [t] = useTr();
  const { navigateTo } = useWorkingCalendarGroupPage();
  const setSelectedGroup = useGroupStore((state) => state.setSelectedGroup);

  const [selectedMode, setSelectedMode] = useState<EntryMode>(EntryMode.FILE);

  const handleConfirm = () => {
    if (!group) return;

    setSelectedGroup(group);
    navigateTo(WorkingCalendarGroupPage.EDIT, { id: group.id, mode: selectedMode });
    onCancel();
  };

  return (
    <GroupModal
      open={open}
      type='edit'
      onCancel={onCancel}
      onConfirm={handleConfirm}
      title={t('edit_group_title', { groupName: group?.name })}
      confirmText={t('continue')}
    >
      <S.Description>{t('edit_mode_question')}</S.Description>

      <Radio.Group value={selectedMode} onChange={(event) => setSelectedMode(event.target.value)}>
        <S.Options>
          {Object.values(EntryMode).map((mode) => (
            <S.Option key={mode} $selected={selectedMode === mode} onClick={() => setSelectedMode(mode)}>
              <Radio value={mode} />
              <S.OptionContent>
                <S.OptionTitle>{t(EDIT_MODE_LABELS[mode].title)}</S.OptionTitle>
                <S.OptionDescription>{t(EDIT_MODE_LABELS[mode].description)}</S.OptionDescription>
              </S.OptionContent>
            </S.Option>
          ))}
        </S.Options>
      </Radio.Group>
    </GroupModal>
  );
};

export default EditModal;

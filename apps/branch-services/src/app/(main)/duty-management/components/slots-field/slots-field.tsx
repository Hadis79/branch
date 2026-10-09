import { useState } from 'react';

import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import * as S from './slots-field.style';
import AddSlotModal from './add-slot-modal';
import * as SlotStyle from '../slots/slots.style';
import useSlotText from '../slots/use-slot-text';
import { addSlot, isSameSlot } from '../../utils/utils';
import type { DutySlot } from '../../utils/types';

type SlotsFieldProps = {
  // Filled in by the Form.Item wrapping it, like any other field
  value?: DutySlot[];
  onChange?: (slots: DutySlot[]) => void;
};

// The duty's days and hours: added one at a time through a modal, kept in date order, each removable
const SlotsField = ({ value = [], onChange }: SlotsFieldProps) => {
  const [t] = useTr();
  const [isAdding, setIsAdding] = useState(false);
  const { getFull } = useSlotText();

  const add = (slot: DutySlot) => {
    onChange?.(addSlot(value, slot));
    setIsAdding(false);
  };

  const remove = (slot: DutySlot) => onChange?.(value.filter((item) => !isSameSlot(item, slot)));

  return (
    <S.Box>
      <S.Header>
        <S.Title>{t('slots_label')}</S.Title>
        <Button
          className='add-button'
          type='link'
          icon={<i className='ri-add-line' />}
          onClick={() => setIsAdding(true)}
        >
          {t('add')}
        </Button>
      </S.Header>
      {value.length > 0 && (
        <SlotStyle.Rows>
          {value.map((slot) => (
            <SlotStyle.Row key={`${slot.date}-${slot.from}`}>
              <span>{getFull(slot)}</span>
              <SlotStyle.RemoveButton type='button' aria-label={t('remove_slot')} onClick={() => remove(slot)}>
                <i className='ri-close-line' />
              </SlotStyle.RemoveButton>
            </SlotStyle.Row>
          ))}
        </SlotStyle.Rows>
      )}
      <AddSlotModal open={isAdding} slots={value} onAdd={add} onCancel={() => setIsAdding(false)} />
    </S.Box>
  );
};

export default SlotsField;

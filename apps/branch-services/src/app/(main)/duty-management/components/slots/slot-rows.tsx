import * as S from './slots.style';
import useSlotText from './use-slot-text';
import type { DutySlot } from '../../utils/types';

// One full-width row per slot, its date and its hours apart; used by the preview step
const SlotRows = ({ slots }: { slots: DutySlot[] }) => {
  const { getDate, getHours } = useSlotText();

  return (
    <S.Rows>
      {slots.map((slot) => (
        <S.Row key={`${slot.date}-${slot.from}`}>
          <span>{getDate(slot)}</span>
          <span>{getHours(slot)}</span>
        </S.Row>
      ))}
    </S.Rows>
  );
};

export default SlotRows;

import * as S from './slots.style';
import useSlotText from './use-slot-text';
import type { DutySlot } from '../../utils/types';

// A compact "date - hours" chip per slot, used by the list's cards
const SlotChips = ({ slots }: { slots: DutySlot[] }) => {
  const { getFull } = useSlotText();

  return (
    <S.Chips>
      {slots.map((slot) => (
        <S.Chip key={`${slot.date}-${slot.from}`}>{getFull(slot)}</S.Chip>
      ))}
    </S.Chips>
  );
};

export default SlotChips;

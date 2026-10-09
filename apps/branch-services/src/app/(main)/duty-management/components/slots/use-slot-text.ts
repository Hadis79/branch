import { useTr } from '@branch-services/translation';

import { formatDigits, formatSlotDate } from '../../utils/utils';
import type { DutySlot } from '../../utils/types';

// A slot's texts: its date with the weekday, its hours, and both on one line
const useSlotText = () => {
  const [t] = useTr();

  const getDate = (slot: DutySlot) => formatSlotDate(slot.date);

  const getHours = (slot: DutySlot) => t('slot_hours', { from: formatDigits(slot.from), to: formatDigits(slot.to) });

  const getFull = (slot: DutySlot) =>
    t('slot_full', { date: getDate(slot), from: formatDigits(slot.from), to: formatDigits(slot.to) });

  return { getDate, getHours, getFull };
};

export default useSlotText;

import { useTr } from '@branch-services/translation';

import * as S from './rule-form.style';

const NOTE_KEYS = ['rule_note_days', 'rule_note_holidays', 'rule_note_end_date'];

// How a rule's days, holidays and optional end date work; shown on both the form and its preview
const RuleNotes = () => {
  const [t] = useTr();

  return (
    <S.Notes>
      {NOTE_KEYS.map((key) => (
        <li key={key}>{t(key)}</li>
      ))}
    </S.Notes>
  );
};

export default RuleNotes;

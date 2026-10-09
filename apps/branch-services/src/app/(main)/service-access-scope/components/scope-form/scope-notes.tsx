import { useTr } from '@branch-services/translation';

import * as S from './scope-form.style';

const NOTE_KEYS = ['scope_note_days', 'scope_note_holidays', 'scope_note_end_date'];

// How a scope's days, holidays and optional end date work; shown on both the form and its preview
const ScopeNotes = () => {
  const [t] = useTr();

  return (
    <S.Notes>
      {NOTE_KEYS.map((key) => (
        <li key={key}>{t(key)}</li>
      ))}
    </S.Notes>
  );
};

export default ScopeNotes;

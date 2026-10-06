import { useTr } from '@branch-services/translation';

import * as S from './exception-form.style';

// What an exception's days and optional end date mean; shown on both the form and its preview
const ExceptionNotes = () => {
  const [t] = useTr();

  return (
    <S.Notes>
      <li>{t('exception_note_days')}</li>
      <li>{t('exception_note_end_date')}</li>
    </S.Notes>
  );
};

export default ExceptionNotes;

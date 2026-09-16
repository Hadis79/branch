import { useTr } from '@branch-services/translation';
import { MessageBox } from '@branch-services/ui-kit';

import Filter from '../filter/filter';
import useCartableStore from '../../store/use-cartable-store';
import * as S from './top-section.style';

const TopSection = () => {
  const { t } = useTr();
  const { message, resetMessage } = useCartableStore();

  return (
    <S.TopSectionWrapper>
      {message && (
        <MessageBox
          message={message?.shouldTranslate ? t(message?.txt) : message?.txt}
          type={message.type}
          subErrors={message?.subErrors}
          closable
          shouldScroll
          style={{ marginBottom: '3rem' }}
          linkProps={
            message?.linkProps && { title: message?.linkProps?.title as string, url: message?.linkProps?.url as string }
          }
          onClose={() => resetMessage()}
        />
      )}
      <Filter />
    </S.TopSectionWrapper>
  );
};

export default TopSection;

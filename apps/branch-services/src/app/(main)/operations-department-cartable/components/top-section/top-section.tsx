import { useTr } from '@branch-services/translation';
import { MessageBox } from '@branch-services/ui-kit';

import Filter from '../filter/filter';
import * as S from './top-section.style';
import useOperationsDepartmentCartableStore from '../../store/use-widget-store';

const TopSection = () => {
  const { t } = useTr();
  const { message, resetMessage } = useOperationsDepartmentCartableStore();

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

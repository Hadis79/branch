import React from 'react';

import * as S from './app.style';
import { Filter } from '../filter/filter';
import History from '../history/history';
import { MessageBox } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';
import useOperationsRequestsHistoryStore from '../../store/use-widget-store';

const App: React.FC = () => {
  const [t] = useTr();
  const { message, resetMessage } = useOperationsRequestsHistoryStore();
  return (
    <S.AppContainer>
      {message && (
        <MessageBox
          message={message?.shouldTranslate ? t(message?.txt) : message?.txt}
          type={message.type}
          subErrors={message?.subErrors}
          closable
          shouldScroll
          style={{ margin: '1.4rem 3.2rem 0' }}
          linkProps={
            message?.linkProps && { title: message?.linkProps?.title as string, url: message?.linkProps?.url as string }
          }
          onClose={() => resetMessage()}
        />
      )}
      <Filter />
      <History />
    </S.AppContainer>
  );
};

export default App;

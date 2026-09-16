import React from 'react';
import * as S from './app.style';
import { Filter } from '../filter/filter';
import History from '../history/history';
import { useTr } from '@branch-services/translation';
import { MessageBox } from '@branch-services/ui-kit';
import useNewRequestsWidgetStore from '../../store/use-widget-store';
import { PageKind } from '../../utils/enums';
import StepperComponent from '../stepper/stepper';
import ShowFileDetails from '../show-file-details';

const App: React.FC = () => {
  const [t] = useTr();
  const { message, resetMessage, pageKind, showFileDetailsTable } = useNewRequestsWidgetStore();
  const renderErrorMessageBox = () => {
    return (
      <>
        {message && (
          <MessageBox
            message={message?.shouldTranslate ? t(message?.txt) : message?.txt}
            type={message.type}
            subErrors={message?.subErrors}
            closable
            shouldScroll
            style={{ margin: '1.4rem 3.2rem 0' }}
            linkProps={
              message?.linkProps && {
                title: message?.linkProps?.title as string,
                url: message?.linkProps?.url as string,
              }
            }
            onClose={() => resetMessage()}
          />
        )}
      </>
    );
  };
  if (showFileDetailsTable) {
    return (
      <S.AppContainer>
        <ShowFileDetails />
      </S.AppContainer>
    );
  }
  return (
    <S.AppContainer>
      {renderErrorMessageBox()}
      {pageKind === PageKind.HISTORY ? (
        <>
          <Filter />
          <History />
        </>
      ) : (
        <div style={{ padding: '1.6rem 3rem' }}>
          <StepperComponent />
        </div>
      )}
    </S.AppContainer>
  );
};

export default App;

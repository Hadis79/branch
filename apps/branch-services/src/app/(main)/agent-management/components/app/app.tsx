import React from 'react';
import * as S from './app.style';
import Stepper from '../stepper/stepper';
import { MessageBox } from '@branch-services/ui-kit';
import useAgentManagementWidgetStore from '../../store/use-widget-store';
import { useTr } from '@branch-services/translation';

const App: React.FC<any> = () => {
  const { message, resetMessage } = useAgentManagementWidgetStore();
  const [t] = useTr();
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
            style={{ margin: '0 0 2.4rem 0' }}
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
  return (
    <S.AppContainer>
      {renderErrorMessageBox()}
      <Stepper />
    </S.AppContainer>
  );
};

export default App;

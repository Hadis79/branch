import React from 'react';
import * as S from './app.style';
import useOrganizationCodeStore from '../../store/use-widget-store';
import OrganizationCodeList from '../organization-code-list/organization-code-list';
import CreateOrganizationCode from '../create-organization-code/create-organization-code';
import { MessageBox } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

const App: React.FC = () => {
  const [t] = useTr();
  const { view, message, setMessage } = useOrganizationCodeStore();

  return (
    <S.AppContainer>
      {message && (
        <MessageBox
          message={message.shouldTranslate ? t(message.txt) : message.txt}
          type={message.type}
          subErrors={message.subErrors}
          closable
          shouldScroll
          style={{ margin: '3.2rem' }}
          onClose={() => setMessage(null)}
        />
      )}
      {view === 'list' ? <OrganizationCodeList /> : <CreateOrganizationCode />}
    </S.AppContainer>
  );
};

export default App;

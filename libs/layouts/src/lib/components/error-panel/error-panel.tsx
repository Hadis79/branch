import React from 'react';

import * as S from './error-panel.style';
import NotFoundError from './404-error';

interface ErrorPanelProps {
  type: '404' | '500' | 'offline';
}

const ErrorPanel: React.FC<ErrorPanelProps> = ({ type }) => {
  switch (type) {
    case '404':
      return <NotFoundError />;
    case '500':
      return (
        <S.Wrapper>
          <S.ErrorNumbers>
            <p>5</p>
            <p>0</p>
            <p>0</p>
          </S.ErrorNumbers>
          <S.Info>Server-side error occurred.</S.Info>
        </S.Wrapper>
      );
    case 'offline':
      return (
        <S.Wrapper>
          <S.LogoContainer>
            {/*<LogoDetail style={{ width: '20rem', height: '20rem' }} />*/}
            {/*<NoConnectionIcon
              style={{ position: 'absolute', bottom: '-1rem', right: '-1rem' }}
            />*/}
          </S.LogoContainer>

          <S.Info>
            Page not cached or Lynx is offline.
            <br />
            Reconnect and refresh the app.
          </S.Info>
        </S.Wrapper>
      );
    default:
      return <></>;
  }
};

export default ErrorPanel;

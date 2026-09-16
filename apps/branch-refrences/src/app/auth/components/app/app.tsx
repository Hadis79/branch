import React, { ReactNode } from 'react';
import * as S from './app.style';

const App: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <S.AppContainer>{children}</S.AppContainer>;
};

export default App;

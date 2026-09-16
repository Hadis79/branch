import { ReactNode } from 'react';

import * as S from './main-content.style';

export type MainContentProps = {
  children?: ReactNode;
};

const MainContent = ({ children }: MainContentProps) => {
  return <S.MainContentContainer>{children}</S.MainContentContainer>;
};

export default MainContent;

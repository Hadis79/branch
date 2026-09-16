import { useEffect } from 'react';

import { useTr } from '@branch-services/translation';
import { PageProps } from '@branch-services/types';

import DataTable from '../data-table/data-table';
import TopSection from '../top-section/top-section';
import { PageKind, RequestStatusButton } from '../../utils/consts';
import FinalConfirmation from '../final-confirmation/final-confirmation';

import * as S from './app.style';
import useCartableStore from '../../store/use-widget-store';
import CartablModals from '../modals';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const { statusRequest, setStatusRequest, setModalType, pageKind, setPageKind } = useCartableStore();

  useEffect(() => {
    setStatusRequest(RequestStatusButton.DEFAULT);
    setPageKind(PageKind.HISTORY);
    setModalType(null);
  }, []);

  return (
    <S.AppContainer>
      {pageKind === PageKind.HISTORY && (
        <>
          <TopSection />
          <DataTable />
        </>
      )}

      {pageKind === PageKind.CONFIRMATION && (
        <>
          <CartablModals />
          <FinalConfirmation />
        </>
      )}
    </S.AppContainer>
  );
};

export default App;

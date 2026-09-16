import { useEffect } from 'react';

import { useTr } from '@branch-services/translation';
import { PageProps } from '@branch-services/types';

import DataTable from '../data-table/data-table';
import TopSection from '../top-section/top-section';
import { RequestStatusButton } from '../../utils/consts';
import useCartableStore from '../../store/use-cartable-store';
import FinalConfirmation from '../final-confirmation/final-confirmation';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const { statusRequest, setStatusRequest, setModalType } = useCartableStore();

  useEffect(() => {
    setStatusRequest(RequestStatusButton.DEFAULT);
    setModalType(null);
  }, []);

  return (
    <S.AppContainer>
      {statusRequest === RequestStatusButton.DEFAULT ? (
        <>
          <TopSection />
          <DataTable />
        </>
      ) : (
        <FinalConfirmation />
      )}
    </S.AppContainer>
  );
};

export default App;

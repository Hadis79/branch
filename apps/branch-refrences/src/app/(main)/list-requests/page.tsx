'use client';
import { useDateLocaleListener } from '@branch-services/hooks';
import { loadTr, useTr } from '@branch-services/translation';
import React, { useEffect } from 'react';
import en from './locales/en';
import fa from './locales/fa';
import App from './components/app/app';
import useListRequestStore from './store/use-widget-store';
import { useSearchParams } from 'next/navigation';
import { PageRoute } from './utils/consts';
import { FileDetailsTable } from '@branch-services/components';

const ListRequestsWidget: React.FC = () => {
  loadTr({ en, fa });
  const [t] = useTr();
  useDateLocaleListener();
  const { resetFilter, resetMessage } = useListRequestStore();
  const searchParams = useSearchParams();
  const step = searchParams.get('step');

  useEffect(() => {
    return () => {
      resetFilter();
      resetMessage();
    };
  }, []);
  return (
    <>
      {step !== PageRoute.QUERY_STATUS ? (
        <App />
      ) : (
        <FileDetailsTable
          id={window.history.state?.id as string}
          ssn={window.history.state?.ssn as string}
          uploadFile={window.history.state?.uploadFile as boolean}
          queryStatus={window.history.state?.queryStatus as boolean}
          serviceUrl='details'
        />
      )}
    </>
  );
};

export default ListRequestsWidget;

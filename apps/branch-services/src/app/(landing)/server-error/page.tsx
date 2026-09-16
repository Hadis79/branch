'use client';

import React, { useEffect } from 'react';
import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';
import { useUserQuery } from '@branch-services/hooks';
import { useRouter } from 'next/navigation';
import { MAIN_HREF } from '@branch-services/utils';
import Image from 'next/image';

function ServerErrorPage() {
  const router = useRouter();
  const [t] = useTr();
  const { isLoading, refetch } = useUserQuery();

  useEffect(() => {
    if (!isSameDomain()) {
      router.push(MAIN_HREF.HOME);
    }
  }, []);

  function isSameDomain() {
    const previousUrl = document.referrer;
    const sameDomain = previousUrl.includes(window.location.origin);
    return sameDomain;
  }

  return (
    <div className='server-error'>
      <Image src={'/assets/server-error.svg'} width={280} height={280} alt='' />
      <span className='error__title'>{t('error.info_error_title')}</span>
      <p className='error__desc'>{t('error.user_error_desc')}</p>
      <div className='user_error_state'>
        {/* <span className='error_text'>{t(message?.txt)}</span> */}

        <Button loading={isLoading} type='primary' onClick={() => refetch()}>
          {t('button.retry')}
        </Button>
      </div>
    </div>
  );
}

export default ServerErrorPage;

import { useRouter } from 'next/navigation';

import { Box, Button } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';
import { useUserStore } from '@branch-services/hooks';
import { MAIN_HREF } from '@branch-services/utils';

import { ReactComponent as NotFound } from '../../assets/media/404-error.svg';
import * as S from './404-error.style';

const NotFoundError = () => {
  const [t] = useTr();
  const router = useRouter();
  const { isAuth } = useUserStore();

  function homeHandler() {
    if (!isAuth) {
      router.push(MAIN_HREF.AUTH);
    } else {
      router.push(MAIN_HREF.HOME);
    }
  }

  function previousHandler() {
    if (!isAuth) {
      router.push(MAIN_HREF.AUTH);
      return;
    }

    if (!isSameDomain()) {
      router.back();
    } else {
      router.push(MAIN_HREF.HOME);
    }
  }

  function isSameDomain() {
    const previousUrl = document.referrer;
    const sameDomain = previousUrl.includes(window.location.origin);
    return sameDomain;
  }

  return (
    <S.NotFoundWrapper>
      <NotFound className='not-found-svg' />
      <S.ErrorDesc>
        <p className='not-found-title'>{t('error.404')} </p>
        <Box className='not-found-btns'>
          <Button type='primary' className='home-btn' onClick={homeHandler}>
            {t('button.home')}
          </Button>
          <Button type='text' className='back-btn' onClick={previousHandler}>
            {t('button.back_to_previous')}
          </Button>
        </Box>
      </S.ErrorDesc>
    </S.NotFoundWrapper>
  );
};

export default NotFoundError;

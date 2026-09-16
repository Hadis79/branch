import { Box } from '../../box/box';
import { Button } from '../../button/button';

import { ReactComponent as NotFoundSVG } from '../../assets/media/connectivity.svg';

import * as S from './bottomSheet-error-message.style';
import { useTr } from '@branch-services/translation';

export const BottomSheetErrorMessage = ({ message, loading, reTryHandler }) => {
  const [t] = useTr();
  console.log('-------------', message);
  return (
    <S.ErrorMessageContainer flexDirection='column'>
      <Box>
        <NotFoundSVG />
      </Box>
      <Box className='text-box' textAlign='center' flexDirection='column' margin={'1rem'}>
        <span>{t('common.error_message_title')}</span>
        <span>{t(message?.txt)}</span>
      </Box>
      <Button type='primaryOutlined' icon={<i className='ri-refresh-line' />} loading={loading} onClick={reTryHandler}>
        {t('button.retry')}
      </Button>
    </S.ErrorMessageContainer>
  );
};

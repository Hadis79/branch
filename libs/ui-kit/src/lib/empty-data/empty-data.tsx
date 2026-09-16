import { Empty } from 'antd';

import { useTr } from '@branch-services/translation';

import { Box } from '../box/box';
import { Button } from '../button/button';
import EmptyImg from '../assets/media/empty_state.svg';

import * as S from './empty-data.style';

type EmptyDataPropTypes = {
  description?: string;
  image?: string;
  hasBackButton?: boolean;
  backCallBack?: () => void;
};

export const EmptyData: React.FC<EmptyDataPropTypes> = (props) => {
  const [t] = useTr();
  const { description, image, hasBackButton = false, backCallBack, ...restProps } = props;

  return (
    <S.EmptyWrapper>
      <Box justifyContent='center' alignItems='center' margin=' 4.8rem 0  0  0 '>
        <Empty image={image ?? EmptyImg} description={description ?? t('uikit.empty_description')} {...restProps} />
      </Box>
      {hasBackButton && (
        <Button className='empty__button' onClick={backCallBack}>
          {t('button.return')}
        </Button>
      )}
    </S.EmptyWrapper>
  );
};

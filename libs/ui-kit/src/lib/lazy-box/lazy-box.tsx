import { Box } from '../box/box';

import * as S from './lazy-box.style';
import { ExpandButton } from '../button/expand-button';

export const LazyBox = (props) => {
  const { loading, children, className, title = '', subtitle = '', open = false } = props;

  const handleToggleClick = (e, info) => {
    e.stopPropagation();

    if (props.onToggle) {
      props.onToggle();
    }
  };

  const getExpandButton = () => <ExpandButton loading={loading} open={open} onClick={handleToggleClick} />;

  return (
    <S.Wrapper className={className}>
      <div className={'lazybox__header'} onClick={(e) => handleToggleClick(e, null)}>
        <div className={'header__title__container'}>
          <span className={'lazybox__header__title'}>{title}</span>
          <span className={'lazybox__header__subtitle'}>{subtitle}</span>
        </div>
        {getExpandButton()}
      </div>

      {open && <Box className={`lazybox__body`}>{children}</Box>}
    </S.Wrapper>
  );
};

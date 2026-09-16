import * as S from './previous-validate-modal.style';
import { useTr } from '@branch-services/translation';
import { ReactComponent as WarningIcon } from '../../assets/media/alert-warning.svg';

type PropsType = {
  open: any;
  footer?: any;
};
const PreviosValidateModal = (props: PropsType) => {
  const { open, footer } = props;
  const [t] = useTr();
  return (
    <S.ModalWrapper open={open} closable={false} centered={true} footer={footer}>
      <div className={'modal-wrapper__header'}>
        <WarningIcon />
        <p className={'modal-wrapper__title'}>{t('attention')}</p>
      </div>

      <div className='modal-wrapper__body'>
        <p>{t('desc_modal')}</p>
        <p>{t('finally_desc_modal')}</p>
      </div>
    </S.ModalWrapper>
  );
};

export default PreviosValidateModal;

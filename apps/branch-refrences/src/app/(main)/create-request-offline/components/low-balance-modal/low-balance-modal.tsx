import * as S from './low-balance-modal.style';
import { useTr } from '@branch-services/translation';

type PropsType = {
  open: any;
  footer: any;
};
const LowBalanceModal = (props: PropsType) => {
  const { open, footer } = props;
  const [t] = useTr();
  return (
    <S.ModalWrapper open={open} closable={false} centered={true} footer={footer}>
      <div className={'modal-wrapper__header'}>
        <i className='ri-error-warning-fill'> </i>
        <p className={'modal-wrapper__title'}>{t('low_balance')}</p>
      </div>

      <div className='modal-wrapper__body'>{t('continue_with_low_balance')}</div>
    </S.ModalWrapper>
  );
};

export default LowBalanceModal;

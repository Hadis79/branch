import { useTr } from '@branch-services/translation';
import * as S from './withdrawal-type-modal.style';
import { useWidgetStore } from '../../store';
import { withdrawalTypesEnum } from '../../utils/types';
import { useResponsive } from '@branch-services/hooks';
import { BottomSheet } from '@branch-services/ui-kit';
import { LocalStorageKey } from '@branch-services/types';
import { storage } from '@branch-services/utils';

type PropsType = {
  open: boolean;
  onClickBoxCallback: () => void;
};

const WithdrawalTypeModal = ({ open, onClickBoxCallback: onClickCallback }: PropsType) => {
  const [t] = useTr();
  const { setActiveWithdrawalType } = useWidgetStore((state) => state);
  const { isMobileOrTablet } = useResponsive();

  const withdrawalTypes = [
    {
      key: withdrawalTypesEnum.ACCOUNT_METHOD,
      icon: 'ri-arrow-left-right-line',
      title: t('transfer_by_account_title'),
      subTitle: t('transfer_by_source_account_subtitle'),
    },
    {
      key: withdrawalTypesEnum.CHEQUE_METHOD,
      icon: 'ri-layout-right-2-line',
      title: t('transfer_by_cheque_title'),
      subTitle: t('transfer_by_cheque_subtitle'),
    },
  ];

  const onClickWithdrawalMethod = (selectedItem) => {
    setActiveWithdrawalType(selectedItem.key);
    storage.setItem(LocalStorageKey.WITHDRAWAL_TYPE, selectedItem.key);
    onClickCallback();
  };
  return (
    <>
      {isMobileOrTablet ? (
        <BottomSheet open={open} closable={false} centered footer={false}>
          <S.WithdrawalModalContent>
            <div className='modal__header'>
              <div className='modal__title'>{t('withdrawal_type_title')}</div>
              <div className='modal__desc'>{t('withdrawal_type_description')}</div>
            </div>

            <div className='modal__content'>
              {withdrawalTypes.map((item) => (
                <div key={item.key} className='withdrawal-method' onClick={() => onClickWithdrawalMethod(item)}>
                  <i className={`${item.icon} withdrawal-method__icon`}></i>
                  <div className='withdrawal-method__desc'>
                    <span className='withdrawal-method__title'>{item.title}</span>
                    <span className='withdrawal-method__subtitle'>{item.subTitle}</span>
                  </div>
                  <i className='ri-arrow-left-s-line withdrawal-method__icon-arrow'></i>
                </div>
              ))}
            </div>
          </S.WithdrawalModalContent>
        </BottomSheet>
      ) : (
        <S.ModalWrapper open={open} closable={false} centered footer={false}>
          <div className='modal__header'>
            <div className='modal__title'>{t('withdrawal_type_title')}</div>
            <div className='modal__desc'>{t('withdrawal_type_description')}</div>
          </div>

          <div className='modal__content'>
            {withdrawalTypes.map((item) => (
              <div key={item.key} className='withdrawal-method' onClick={() => onClickWithdrawalMethod(item)}>
                <i className={`${item.icon} withdrawal-method__icon`}></i>
                <div className='withdrawal-method__desc'>
                  <span className='withdrawal-method__title'>{item.title}</span>
                  <span className='withdrawal-method__subtitle'>{item.subTitle}</span>
                </div>
                <i className='ri-arrow-left-s-line withdrawal-method__icon-arrow'></i>
              </div>
            ))}
          </div>
        </S.ModalWrapper>
      )}
    </>
  );
};

export default WithdrawalTypeModal;

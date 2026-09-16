import { useCallback, useEffect } from 'react';
import { ReactComponent as DraftIcon } from '../../assets/media/draft.svg';
import * as S from './request-draft.style';
import TimerComponent from '../validation-step/timer/timer';
import { calculateValidationPercent } from '../../utils/utils';
import NewRequestModal from './new-request-modal/new-request-modal';
import { useTr } from '@branch-services/translation';
import { useWidgetStore } from '../../store';
import { Button, Progress } from '@branch-services/ui-kit';
import { PageRoute, PaymentType } from '../../utils/consts';
import { usePathname } from 'next/navigation';
import { addThousandSeparator, numberToPersian, rialToToman } from '@branch-services/utils';

function RequestDraft() {
  const [t] = useTr();
  const { setActiveStep, validateResponse, checkValidationResponse, setOpenNewRequestSheet, setOpenDraft } =
    useWidgetStore((state) => state);
  const pathname = usePathname();
  const calculatePercent = useCallback(
    () => calculateValidationPercent(checkValidationResponse),
    [checkValidationResponse]
  );

  useEffect(() => {
    setOpenDraft(true);
    return () => {
      setOpenDraft(false);
    };
  }, []);

  const handleChangeStep = ({ current, pageKind, openSheet = false }) => {
    const step = {
      current,
    };
    setActiveStep(current);
    window.history.pushState({}, '', `${pathname}?step=${pageKind}`);
    setOpenNewRequestSheet(openSheet);
  };

  const getTransferMethodLabel = (transferMethod) => {
    switch (transferMethod) {
      case PaymentType.AUTO:
        return t('auto_transfer_type');
      case PaymentType.INTRA_BANK:
      case PaymentType.LOCAL:
        return t('local');
      case PaymentType.PAYA:
        return t('paya');
      case PaymentType.SATNA:
        return t('satna');
    }
  };

  return (
    <S.Wrapper>
      <DraftIcon />
      <span className='message'>{t('draft_request.msg')}</span>
      <div className='item'>
        <span className='item_title'>{t('draft_request.transaction_type')}</span>
        <span className='item_value'>{getTransferMethodLabel(checkValidationResponse?.paymentType)}</span>
      </div>
      <div className='item'>
        <span className='item_title'>{t('draft_request.total_records')}</span>
        <span className='item_value'>{checkValidationResponse?.totalRecords}</span>
      </div>
      <div className='item'>
        <span className='item_title'>{t('draft_request.repetitive_records')}</span>
        <span className='item_value'>{checkValidationResponse?.duplicateRecordCount}</span>
      </div>
      <div className='item total_amount'>
        <span className='item_title'>{t('draft_request.total_amount')}</span>
        <span className='item_value'>
          <div>
            {checkValidationResponse?.totalAmount &&
              `${addThousandSeparator(checkValidationResponse?.totalAmount)} ${t('common.rial')}`}
          </div>
          <sub>
            {checkValidationResponse?.totalAmount &&
              `${numberToPersian(rialToToman(checkValidationResponse?.totalAmount))} ${t('common.toman')}`}
          </sub>
        </span>
      </div>
      <Progress
        title={checkValidationResponse?.finished ? t('completion') : ''}
        strokeWidth={8}
        percent={calculatePercent()}
      />
      <TimerComponent
        counter={checkValidationResponse?.finished ? 0 : checkValidationResponse?.successValidationCount}
        totalRecord={checkValidationResponse?.totalRecords}
      />
      <div className='buttons-container'>
        <Button
          className='new_request-form__button'
          size='large'
          type='primaryOutlined'
          onClick={() => setOpenNewRequestSheet(true)}
        >
          {t('create_new_request')}
        </Button>
        <Button
          className='continue-form__button'
          size='large'
          type='primary'
          htmlType='submit'
          onClick={() => handleChangeStep({ current: 2, pageKind: PageRoute.VALIDATE })}
        >
          {t('continue_process')}
        </Button>
      </div>

      <NewRequestModal />
    </S.Wrapper>
  );
}

export default RequestDraft;

import { useTr } from '@branch-services/translation';
import { Box, Text } from '@branch-services/ui-kit';
import * as S from './payment-type-info.style';
import { paymentTypesInfo } from '../../../utils/consts';

const PaymentTypeInfo = () => {
  const [t] = useTr();

  const getTransferTypeLabel = (type) => {
    const label = type.toLowerCase();
    return t(label === 'local' ? 'melli_name' : label);
  };
  return (
    <S.PaymentTypeInfoWrapper>
      <Text>{t('transfer_info_title')}</Text>

      <Box className={'info-container'}>
        {paymentTypesInfo.map((item, index) => (
          <div key={item.value} className={'grid-container'}>
            <div className='titel-col'>{getTransferTypeLabel(item.value)}</div>
            <div>
              <div className={'info-col'}>
                {t('amount')}: {t(item?.content)}
              </div>
              <div className={'info-col'}>
                {t('time')}: {t(item?.time)}
              </div>
            </div>
          </div>
        ))}
      </Box>
    </S.PaymentTypeInfoWrapper>
  );
};

export default PaymentTypeInfo;

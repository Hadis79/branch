import React from 'react';
import { useTr } from '@branch-services/translation';
import { getValueOrDash } from '@branch-services/utils';
import { OrganizationCodeFormValues, OrganizationCodeResponseDto } from '../../utils/types';
import * as S from './record-summary.style';

interface RecordSummaryProps {
  values: OrganizationCodeFormValues | OrganizationCodeResponseDto;
  compact?: boolean;
}

const RecordSummary = ({ values, compact = false }: RecordSummaryProps) => {
  const [t] = useTr();

  return (
    <S.Summary $compact={compact}>
      <span>{t('national_id')}</span>
      <strong>{getValueOrDash(values.ssn)}</strong>
      <span>{t('organization_code')}</span>
      <strong>{getValueOrDash(values.organizationCode)}</strong>
      {values.organizationName && (
        <>
          <span>{t('organization_name')}</span>
          <strong>{getValueOrDash(values.organizationName)}</strong>
        </>
      )}
      <span>{t('account_number')}</span>
      <strong>{getValueOrDash(values.accountNumber)}</strong>
    </S.Summary>
  );
};

export default RecordSummary;

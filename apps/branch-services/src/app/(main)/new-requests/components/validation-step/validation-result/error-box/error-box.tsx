import React from 'react';
import * as S from './error-box.style';
import { ReactComponent as ErrorIcon } from './../../../../assets/media/alert-error.svg';

import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';
import useNewRequestsWidgetStore from '../../../../store/use-widget-store';
import useDownloadErrorFileQuery from '../../../../queries/use-download-error-file-query';

function ErrorBox() {
  const [t] = useTr();
  const { checkValidationResponse } = useNewRequestsWidgetStore();
  const { refetch: downloadErrorFile, isFetching } = useDownloadErrorFileQuery();
  return (
    <S.ErrorWrapper>
      <span className='heading'>
        <ErrorIcon />
        <span>{t('validation_error_result')}</span>
      </span>
      <span className='desc'>{t('validation_error_desc')}</span>
      <div className='error-info'>
        {checkValidationResponse?.errorValidationCount > 0 && (
          <Button
            type='link'
            icon={<i className='ri-download-line ' />}
            onClick={() => downloadErrorFile()}
            loading={isFetching}
          >
            {t('validation_error_info', {
              errorValidationCount: checkValidationResponse?.errorValidationCount,
            })}
          </Button>
        )}
      </div>
    </S.ErrorWrapper>
  );
}

export default ErrorBox;

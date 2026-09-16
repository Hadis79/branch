import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';
import { InfoItemType } from '@branch-services/types';
import { addThousandSeparator, getFileExtension, getValueOrDash } from '@branch-services/utils';

import * as S from './upload-result-box.style';
import React from 'react';
import { useWidgetStore } from '../../../store';
import useDownloadErrorFileQuery from '../../../queries/use-download-error-file-query';
import { usePathname, useRouter } from 'next/navigation';
import { PageRoute } from '../../../utils/consts';
import useEvictCacheMutation from '../../../queries/use-evict-cache-mutation';

const UploadResultBox = () => {
  const [t] = useTr();
  const pathname = usePathname();
  const { uploadResponse, setCancelUpload, formValues } = useWidgetStore((state) => state);
  const { mutate: evictUserCacheMutation, isPending } = useEvictCacheMutation(true);
  const {
    data: stateErrorFile,
    isLoading: errorFileLoading,
    refetch: refetchDownloadFile,
  } = useDownloadErrorFileQuery();

  const result = prepareResult();
  function prepareResult() {
    const result: InfoItemType[] = [];

    if (!uploadResponse?.success) {
      const fileType = getFileType(String(uploadResponse?.fileName ?? ''));
      result.push({
        key: 'file_type',
        // value: getValueOrDash(fileType),
        value: getValueOrDash(fileType) ? t(`file_type_${fileType}`) : '-',
      });
      result.push({
        key: 'error_count',
        value: getValueOrDash(uploadResponse?.totalErrorCount),
      });
    } else {
      result.push({
        key: 'total_record',
        value: getValueOrDash(uploadResponse?.totalRecords),
      });
      result.push({
        key: 'duplicate_record_count',
        value: getValueOrDash(uploadResponse?.duplicateRecordCount),
      });
      result.push({
        key: 'total_amount',
        value: `${addThousandSeparator(getValueOrDash(uploadResponse?.totalAmount))} ${t('common.rial')}`,
      });
      result.push({
        key: 'total_wage_amount',
        value: `${addThousandSeparator(getValueOrDash(uploadResponse?.wageOriginalAmount))} ${t('common.rial')}`,
      });
      result.push({
        key: 'average_amount',
        value: `${addThousandSeparator(
          getValueOrDash(Math.trunc((uploadResponse?.totalAmount as number) / (uploadResponse?.totalRecords as number)))
        )} ${t('common.rial')}`,
      });
      result.push({
        key: 'sum_amount_wage',
        value: `${addThousandSeparator(
          getValueOrDash((uploadResponse?.totalAmount as number) + (uploadResponse?.wageAmount as number))
        )} ${t('common.rial')}`,
      });
    }
    return result;
  }

  function getFileType(fileName: string) {
    const extension = getFileExtension(fileName);
    switch (extension) {
      case 'xls':
      case 'xlsx':
        return 'excel';
      case 'CCTI':
        return 'CCTI';
      case 'csv':
        return 'csv';
      case 'tsv':
        return 'tsv';
      case 'txt':
      case extension.match(/^[0-9]*$/) ? extension : undefined:
        return 'text';
      default:
        return '';
    }
  }
  const handleCancelUpload = () => {
    setCancelUpload();
    evictUserCacheMutation();
  };
  const handleDownloadErrorFile = () => {
    refetchDownloadFile();
  };

  const goToUploadDetailPage = () => {
    window.history.pushState(
      {
        id: uploadResponse?.id,
        ssn: formValues.ssn,
        uploadFile: true,
      },
      '',
      `${pathname}?step=${PageRoute.FILE_DETAILS}`
    );
  };

  return (
    <S.UploadResultBoxContainer>
      <S.UploadedItem>
        <span className='uploaded-file'>
          <i className='ri-file-excel-line ri-2x' />
          <span>{uploadResponse?.fileName?.toString()}</span>
        </span>
        <span>
          <i
            className='ri-delete-bin-2-line ri-2x'
            style={{ cursor: 'pointer', lineHeight: 1.5 }}
            onClick={handleCancelUpload}
          />
        </span>
      </S.UploadedItem>

      {uploadResponse?.hasSimilarRequest && (
        <S.UploadedItem className='similar_req_warning'>
          <span>
            <i className='ri-alert-line ri-2x'></i>
          </span>
          <span>{t('file_is_duplicated')}</span>
        </S.UploadedItem>
      )}

      <S.ResultBoxContainer>
        <S.TitleBox is_success={uploadResponse?.success}>
          <div className='title'>
            <div className='icon-title'>
              <div className='head_title'>
                <i
                  className={`${uploadResponse?.success ? 'ri-checkbox-circle-fill' : 'ri-close-circle-fill ri-2x'}`}
                />
                <span className='upload_title_text'>{t('file_info')}</span>
              </div>
              {uploadResponse?.success && (
                // <Button onClick={goToUploadDetailPage}>
                //   <span className='upload_view_detail'>{t('view_detail_files')}</span>
                //   <i className='ri-arrow-left-s-line' />
                // </Button>

                //////TODO/////////////
                <Button className='detail-file-btn' type='link' onClick={goToUploadDetailPage}>
                  <i className='ri-arrow-drop-left-line icon'></i>
                  {t('view_detail_files')}
                </Button>
              )}
            </div>
          </div>
          <div className='action-container'>
            {!uploadResponse?.success && (
              <Button
                type='link'
                icon={<i className='ri-download-line ' />}
                onClick={handleDownloadErrorFile}
                loading={errorFileLoading}
              >
                {t('download_file')}
              </Button>
            )}
          </div>
        </S.TitleBox>

        <S.DetailBox>
          {result?.map((item) => (
            <React.Fragment key={item.key}>
              <div className={'item-title'}>{`${t(item.key)} :`}</div>
              <div className={'item-info'} style={{ justifySelf: 'end' }}>
                {item.value}
              </div>
            </React.Fragment>
          ))}
        </S.DetailBox>
      </S.ResultBoxContainer>
    </S.UploadResultBoxContainer>
  );
};
export default UploadResultBox;

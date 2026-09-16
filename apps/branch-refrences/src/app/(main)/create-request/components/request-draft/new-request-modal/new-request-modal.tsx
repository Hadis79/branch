import { useTr } from '@branch-services/translation';
import { ReactComponent as WarningIcon } from '../../../assets/media/alert-warning.svg';
import useEvictCacheMutation from '../../../queries/use-evict-cache-mutation';
import { useWidgetStore } from '../../../store';
import { usePathname } from 'next/navigation';
import { PageRoute } from '../../../utils/consts';
import { BottomSheet, Button } from '@branch-services/ui-kit';
import { ActionButtonsContainer } from '../../app/app.style';
import { ContentWrapper } from '../request-draft.style';

function NewRequestModal() {
  const [t] = useTr();
  const { setActiveStep, validateResponse, openNewRequestSheet, setOpenNewRequestSheet, checkValidationResponse } =
    useWidgetStore((state) => state);
  const pathname = usePathname();
  const { data: dataEvict, error: errorEvict, isPending, mutate: mutateEvict } = useEvictCacheMutation();

  function handleCreateNewRequest() {
    mutateEvict();
  }

  function handleChangeStep() {
    setOpenNewRequestSheet(false);
    setActiveStep(3);
    window.history.pushState({}, '', `${pathname}?step=${PageRoute.VALIDATE}`);
  }

  return (
    <BottomSheet
      isModalView={true}
      open={openNewRequestSheet}
      onClose={() => setOpenNewRequestSheet(false)}
      footer={
        <ActionButtonsContainer style={{ marginTop: 0 }}>
          <Button
            className='previous-form__button'
            size='large'
            danger
            // type='primaryOutlined'
            loading={!(checkValidationResponse?.errorValidationCount && checkValidationResponse) && isPending}
            onClick={
              checkValidationResponse?.errorValidationCount && checkValidationResponse
                ? handleChangeStep
                : handleCreateNewRequest
            }
          >
            {checkValidationResponse?.errorValidationCount && checkValidationResponse
              ? t('button.cancel')
              : t('button.cancel_processing')}
          </Button>
          <Button
            className='continue-form__button'
            size='large'
            type='primary'
            loading={checkValidationResponse?.errorValidationCount && checkValidationResponse && isPending}
            onClick={
              checkValidationResponse?.errorValidationCount && checkValidationResponse
                ? handleCreateNewRequest
                : handleChangeStep
            }
          >
            {checkValidationResponse?.errorValidationCount && checkValidationResponse
              ? t('button.new_request')
              : t('button.continue')}
          </Button>
        </ActionButtonsContainer>
      }
    >
      <ContentWrapper>
        <div className='head'>
          <WarningIcon />
          <span>{t('attention')}</span>
        </div>
        <span>{t('create_new_request_sheet')}</span>
        <span>
          {!(checkValidationResponse?.errorValidationCount && checkValidationResponse) &&
            t('return_to_previous_step_question')}
        </span>
      </ContentWrapper>
    </BottomSheet>
  );
}

export default NewRequestModal;

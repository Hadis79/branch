import useAgentManagementWidgetStore from '../../../store/use-widget-store';
import { useTr } from '@branch-services/translation';
import { ReactComponent as InfoCircle } from '../../../assets/media/info.svg';
import { ModalWrapper } from '../modal.style';
import { getValueOrDash } from '@branch-services/utils';
import useSubmitAgentMutation from '../../../queries/use-confirm-add-agent-mutation';

interface ConfirmationModalProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const [t] = useTr();
  const { userInfo, orgInfo } = useAgentManagementWidgetStore();
  const { isPending, mutate } = useSubmitAgentMutation();
  const { open, setOpen } = props;
  const handleConfirmRequest = () => {
    setOpen(false);

    const params = {
      orgAgentSsn: orgInfo?.nationalId?.toString()?.trim(),
      orgAgentName: orgInfo?.name?.toString()?.trim(),
      branchAgentSsn: userInfo?.SSN?.toString()?.trim(),
      branchAgentName: `${userInfo?.FirstName?.toString()?.trim()} ${userInfo?.LastName?.toString()?.trim()}`,
    };
    mutate(params);
  };
  return (
    <ModalWrapper
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <InfoCircle />
          <span>{t('confirm')}</span>
        </div>
      }
      okText={t('button.confirm')}
      open={open}
      centered
      onOk={handleConfirmRequest}
      closeIcon={false}
      cancelText={t('button.cancel')}
      onCancel={() => setOpen(false)}
      confirmLoading={isPending}
    >
      <p>{t('sure_to_add_new_agent')}</p>

      <div className={'agent-remove-wrapper'}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{t('full_name')}</span>
          <span>
            {`${getValueOrDash(userInfo?.FirstName)?.toString().trim()} ${getValueOrDash(userInfo?.LastName)
              ?.toString()
              .trim()}`}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{t('company_name')}</span>
          <span> {`${getValueOrDash(orgInfo?.name)?.toString().trim()} `}</span>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmationModal;

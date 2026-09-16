import { useTr } from '@branch-services/translation';
import { ModalWrapper } from '../modal.style';
import { getValueOrDash } from '@branch-services/utils';
import useRemoveAgentMutation from '../../../queries/use-remove-agent-management-mutation';
import useGetAgentInformationQuery from '../../../queries/use-get-agent-information-query';
import { useEffect } from 'react';
import useAgentManagementWidgetStore from '../../../store/use-widget-store';

interface RemoveModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
}

function RemoveModal(props: RemoveModalProps) {
  const { open, setOpen, data } = props;
  const [t] = useTr();
  const { mutate: removeAgent, isSuccess } = useRemoveAgentMutation();
  const { refetch: refetchAgentInformation } = useGetAgentInformationQuery();
  const { userInfo } = useAgentManagementWidgetStore();
  const handleRemoveAgent = () => {
    setOpen(false);
    const params = {
      orgSsn: data?.orgAgentSsn.trim(),
      branchAgentSsn: data?.branchAgentSsn.trim(),
    };
    removeAgent(params);
  };

  useEffect(() => {
    if (isSuccess) {
      refetchAgentInformation();
    }
  }, [isSuccess]);
  return (
    <ModalWrapper
      title={
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <i className='ri-user-unfollow-line' style={{ fontSize: 20, color: 'red' }} />
          {t('remove_agent')}
        </div>
      }
      keyboard={false}
      okType={'danger'}
      okButtonProps={{
        type: 'primary',
      }}
      okText={t('button.remove')}
      onOk={handleRemoveAgent}
      onCancel={() => setOpen(false)}
      open={open}
      centered
      closeIcon={false}
      cancelText={t('button.cancel')}
      destroyOnClose={true}
    >
      <p>{t('sure_to_remove_agent')}</p>

      <div className={'agent-remove-wrapper'}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{t('full_name')}</span>
          {`${getValueOrDash(userInfo?.FirstName)?.toString().trim()} ${getValueOrDash(userInfo?.LastName)
            ?.toString()
            .trim()}`}

          {/*<span>{getValueOrDash(data?.userName)}</span>*/}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{t('company_name')}</span>
          <span>{getValueOrDash(data?.orgAgentName)}</span>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default RemoveModal;

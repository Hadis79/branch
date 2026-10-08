import { ReactNode, useEffect } from 'react';

import { useTr } from '@branch-services/translation';
import { Box, Button } from '@branch-services/ui-kit';

import { GuideMessageBox } from './form-page.style';
import useHolidayMessage from '../../hooks/use-holiday-message';
import useHolidayStore from '../../store/use-widget-store';

type FormPageProps = {
  // Translation key of the guide banner, if the page has one
  info?: string;
  // Shown under the guide banner, e.g. a validation error of the whole form
  error?: ReactNode;
  children: ReactNode;
  submitText: string;
  submitDisabled?: boolean;
  onReset: () => void;
  onSubmit: () => void;
};

// Shared layout of the create pages: guide banner, content, and a cancel / submit footer
const FormPage = ({ info, error, children, submitText, submitDisabled, onReset, onSubmit }: FormPageProps) => {
  const [t] = useTr();
  const { resetMessage } = useHolidayMessage();

  useEffect(() => {
    resetMessage();

    return () => {
      // Form errors must not follow the user back to the list; success messages should.
      const { message, setMessage } = useHolidayStore.getState();
      if (message?.type === 'error') setMessage(null);
    };
  }, [resetMessage]);

  const handleReset = () => {
    resetMessage();
    onReset();
  };

  return (
    <Box minHeight='75vh' flexDirection='column' justifyContent='space-between' gap='2.4rem' padding='3.2rem'>
      <Box flexDirection='column' gap='2.4rem'>
        {info && <GuideMessageBox type='info' message={t(info)} closable />}
        {error}
        {children}
      </Box>
      <Box justifyContent='flex-end' gap='1.2rem' fillChildren={false}>
        <Button htmlType='button' type='primaryOutlined' onClick={handleReset}>
          {t('cancel')}
        </Button>
        <Button htmlType='button' type='primary' disabled={submitDisabled} onClick={onSubmit}>
          {t(submitText)}
        </Button>
      </Box>
    </Box>
  );
};

export default FormPage;

import { ReactNode, useEffect } from 'react';

import { useTr } from '@branch-services/translation';
import { Box, Button, MessageBox } from '@branch-services/ui-kit';

import useHolidayPage from '../../hooks/use-holiday-page';
import useHolidayStore from '../../store/use-widget-store';
import { HolidayPage } from '../../utils/constants';

type FormPageProps = {
  // Translation key of the guide banner
  info: string;
  infoDescription?: ReactNode;
  // Shown under the guide banner, e.g. a validation error of the whole form
  error?: ReactNode;
  children: ReactNode;
  submitText: string;
  submitDisabled?: boolean;
  onSubmit: () => void;
};

// Shared layout of the create pages: guide banner, content, and a cancel / submit footer
const FormPage = ({ info, infoDescription, error, children, submitText, submitDisabled, onSubmit }: FormPageProps) => {
  const [t] = useTr();
  const { navigateTo } = useHolidayPage();
  const setMessage = useHolidayStore((state) => state.setMessage);

  // Drop messages left over from the list page
  useEffect(() => setMessage(null), [setMessage]);

  return (
    <Box minHeight='75vh' flexDirection='column' justifyContent='space-between' gap='2.4rem' padding='3.2rem'>
      <Box flexDirection='column' gap='2.4rem'>
        <MessageBox type='info' message={t(info)} description={infoDescription} closable />
        {error}
        {children}
      </Box>
      <Box justifyContent='flex-end' gap='1.2rem' fillChildren={false}>
        <Button htmlType='button' type='primaryOutlined' onClick={() => navigateTo(HolidayPage.LIST)}>
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

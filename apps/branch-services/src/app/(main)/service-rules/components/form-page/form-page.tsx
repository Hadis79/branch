import { ReactNode } from 'react';

import { Box } from '@branch-services/ui-kit';

import FormSVG from '../../assets/form';

type FormPageProps = {
  header?: ReactNode;
  children: ReactNode;
  footer: ReactNode;
};

// Shell of the create page: an optional full-width header, the content beside the illustration,
// and the action buttons pinned to the bottom
const FormPage = ({ header, children, footer }: FormPageProps) => (
  <Box minHeight='75vh' flexDirection='column' justifyContent='space-between' gap='2.4rem' padding='3.2rem'>
    <Box flexDirection='column' gap='2.4rem'>
      {header}
      <Box flexDirection='row-reverse'>
        <FormSVG />
        <Box flexDirection='column' width='100%'>
          {children}
        </Box>
      </Box>
    </Box>
    <Box justifyContent='flex-end' gap='1.2rem' fillChildren={false}>
      {footer}
    </Box>
  </Box>
);

export default FormPage;

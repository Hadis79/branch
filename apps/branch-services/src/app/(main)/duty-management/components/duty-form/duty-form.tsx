import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button } from '@branch-services/ui-kit';

import * as S from './duty-form.style';
import DutyFields from './duty-fields';
import DutyPreview from './duty-preview';
import FormPage from '../form-page/form-page';
import useDutyForm, { INITIAL_FORM_VALUES } from '../../hooks/use-duty-form';

// A new duty: the group or unit it applies to, its title and its days and hours, then a preview to
// confirm before it's saved
const DutyForm = () => {
  const [t] = useTr();
  const { form, isFormComplete, preview, isSubmitting, showPreview, showAffectedUnits, cancel, submit } = useDutyForm();

  const footer = (
    <Box width='25%'>
      <Button htmlType='button' type='primaryOutlined' disabled={isSubmitting} onClick={cancel}>
        {t('cancel')}
      </Button>
      {preview ? (
        <Button htmlType='button' type='primary' loading={isSubmitting} onClick={submit}>
          {t('confirm_final')}
        </Button>
      ) : (
        <Button htmlType='button' type='primary' disabled={!isFormComplete} onClick={showPreview}>
          {t('continue')}
        </Button>
      )}
    </Box>
  );

  return (
    <FormPage header={<S.InfoMessage type='info' message={t('duty_info_description')} closable />} footer={footer}>
      {preview && <DutyPreview duty={preview} onShowAffectedUnits={showAffectedUnits} />}
      {/* Hidden, not unmounted, behind the preview; cancel on either step resets it */}
      <Form form={form} layout='vertical' initialValues={INITIAL_FORM_VALUES} hidden={Boolean(preview)}>
        <DutyFields />
      </Form>
    </FormPage>
  );
};

export default DutyForm;

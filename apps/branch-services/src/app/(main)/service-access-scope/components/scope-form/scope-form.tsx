import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, MessageBox } from '@branch-services/ui-kit';

import * as S from './scope-form.style';
import ScopeFields from './scope-fields';
import ScopeNotes from './scope-notes';
import ScopePreview from './scope-preview';
import FormPage from '../form-page/form-page';
import useScopeForm, { INITIAL_FORM_VALUES } from '../../hooks/use-scope-form';

// A new service access scope: the service, the group or unit it applies to, title, date range and
// each covered weekday's hours, then a preview to confirm before it's saved
const ScopeForm = () => {
  const [t] = useTr();
  const { form, weekDays, isFormComplete, preview, isSubmitting, showPreview, showAffectedUnits, cancel, submit } =
    useScopeForm();

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
    <FormPage
      header={
        <>
          <S.InfoMessage type='info' message={t('scope_info_description')} closable />
          {preview && (
            <MessageBox type='warning' message={t('scope_notes_title')} description={<ScopeNotes />} closable />
          )}
        </>
      }
      footer={footer}
    >
      {preview && <ScopePreview scope={preview} onShowAffectedUnits={showAffectedUnits} />}
      {/* Hidden, not unmounted, behind the preview; cancel on either step resets it */}
      <Form form={form} layout='vertical' initialValues={INITIAL_FORM_VALUES} hidden={Boolean(preview)}>
        <ScopeFields weekDays={weekDays} />
      </Form>
    </FormPage>
  );
};

export default ScopeForm;

import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, MessageBox } from '@branch-services/ui-kit';

import * as S from './rule-form.style';
import RuleFields from './rule-fields';
import RuleNotes from './rule-notes';
import RulePreview from './rule-preview';
import FormPage from '../form-page/form-page';
import useRuleForm from '../../hooks/use-rule-form';

// A new service rule: the service, title, date range and each covered weekday's hours, then a
// preview to confirm before it's saved
const RuleForm = () => {
  const [t] = useTr();
  const { form, weekDays, isFormComplete, preview, isSubmitting, showPreview, cancel, submit } = useRuleForm();

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
          <S.InfoMessage type='info' message={t('rule_info_description')} closable />
          {preview && (
            <MessageBox type='warning' message={t('rule_notes_title')} description={<RuleNotes />} closable />
          )}
        </>
      }
      footer={footer}
    >
      {preview && <RulePreview rule={preview} />}
      {/* Hidden, not unmounted, behind the preview; cancel on either step resets it */}
      <Form form={form} layout='vertical' hidden={Boolean(preview)}>
        <RuleFields weekDays={weekDays} />
      </Form>
    </FormPage>
  );
};

export default RuleForm;

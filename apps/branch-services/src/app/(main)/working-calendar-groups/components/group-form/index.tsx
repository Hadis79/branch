import { Form } from 'antd';

import { Box, Button } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import FileEntry from './file-entry';
import GroupFormContent from './group-form-content';
import ConfirmModal from '../modals/confirm-modal';
import useGroupFormController from '../../hooks/use-group-form-controller';
import type { GroupFormVariant } from '../../utils/types';

import { FormActions } from './style';

type GroupFormProps = {
  variant: GroupFormVariant;
};

const GroupForm = ({ variant }: GroupFormProps) => {
  const [t] = useTr();
  const controller = useGroupFormController(variant);

  const fileEntry = (
    <FileEntry
      loading={controller.fileUpload.isPending}
      uploadError={controller.fileUpload.errorText}
      onUpload={controller.fileUpload.upload}
      onRemove={controller.fileUpload.reset}
      uploadResult={controller.fileUpload.result}
      previousUnitCount={controller.isEdit && controller.isFileEntry ? controller.previousUnitCount : undefined}
      inlineName={controller.isEdit}
      onViewNewFileDetails={controller.showNewFileDetails}
      onViewPreviousDetails={controller.showPreviousDetails}
    />
  );

  if (controller.isMissingGroup) return null;

  return (
    <>
      <Form layout='vertical' form={controller.form} onFinish={controller.openConfirm}>
        <Box minHeight={'75vh'} flexDirection='column' justifyContent='space-between' padding={'3.2rem'}>
          <GroupFormContent
            isEdit={controller.isEdit}
            isFileEntry={controller.isFileEntry}
            editedGroup={controller.editedGroup}
            activeTab={controller.activeTab}
            fileEntry={fileEntry}
            onEntryModeChange={controller.changeEntryMode}
          />
          <FormActions>
            {!controller.isEdit && (
              <Button htmlType='button' type='primaryOutlined' onClick={controller.resetEntry}>
                {t('button.cancel')}
              </Button>
            )}
            <Button htmlType='submit' type='primary' disabled={controller.isBusy}>
              {t(controller.isEdit ? 'save_changes' : 'create_group')}
            </Button>
          </FormActions>
        </Box>
      </Form>
      <ConfirmModal
        variant={variant}
        entryMode={controller.entryMode}
        open={controller.isConfirmOpen}
        onCancel={controller.closeConfirm}
        onConfirm={controller.confirmSave}
        confirmLoading={controller.isBusy}
        groupName={controller.form.getFieldValue('name')}
        unitCount={
          controller.isFileEntry
            ? controller.fileUpload.unitCount
            : controller.form.getFieldValue('units')?.length ?? 0
        }
      />
    </>
  );
};

export default GroupForm;

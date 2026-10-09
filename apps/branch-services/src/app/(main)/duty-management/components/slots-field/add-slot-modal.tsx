import { useState } from 'react';
import { Form, Modal } from 'antd';

import { useTr } from '@branch-services/translation';
import { dayjs } from '@branch-services/utils';
import { Box, Button, MessageBox } from '@branch-services/ui-kit';

import * as S from './slots-field.style';
import SlotCalendar from './slot-calendar';
import TimeRangeFields from '../time-range-fields/time-range-fields';
import { getSlotError, toApiDate } from '../../utils/utils';
import type { DutySlot, SlotFormValues } from '../../utils/types';

type AddSlotModalProps = {
  open: boolean;
  // The slots picked so far, which a new one may not overlap
  slots: DutySlot[];
  onAdd: (slot: DutySlot) => void;
  onCancel: () => void;
};

// Picks one more duty slot: a day on the calendar and its hours. It starts over every time it opens.
const AddSlotModal = ({ open, slots, onAdd, onCancel }: AddSlotModalProps) => {
  const [t] = useTr();
  const [form] = Form.useForm<SlotFormValues>();
  // Translation key of a slot that is valid on its own but can't join the others
  const [slotError, setSlotError] = useState<string | null>(null);

  const add = () =>
    form
      .validateFields()
      .then(({ date, from, to }) => {
        const slot: DutySlot = { date: toApiDate(date), from: from as string, to: to as string };
        const error = getSlotError(slot, slots);
        if (error) setSlotError(error);
        else onAdd(slot);
      })
      // The invalid fields already show their errors
      .catch(() => undefined);

  const reset = () => {
    form.resetFields();
    setSlotError(null);
  };

  return (
    <Modal
      open={open}
      centered
      footer={null}
      closable={false}
      title={t('slot_date_title')}
      onCancel={onCancel}
      afterClose={reset}
    >
      <Form form={form} layout='vertical' initialValues={{ date: dayjs() }} onValuesChange={() => setSlotError(null)}>
        <Box flexDirection='column' gap='1.6rem'>
          <Form.Item name='date' noStyle>
            <SlotCalendar />
          </Form.Item>
          <TimeRangeFields title={<S.SectionTitle>{t('slot_hour_title')}</S.SectionTitle>} />
          {slotError && <MessageBox type='error' message={t(slotError)} />}
        </Box>
      </Form>
      <Box gap='1.6rem' marginTop='2.4rem'>
        <Button htmlType='button' type='primaryOutlined' onClick={onCancel}>
          {t('cancel')}
        </Button>
        <Button htmlType='button' type='primary' onClick={add}>
          {t('add')}
        </Button>
      </Box>
    </Modal>
  );
};

export default AddSlotModal;

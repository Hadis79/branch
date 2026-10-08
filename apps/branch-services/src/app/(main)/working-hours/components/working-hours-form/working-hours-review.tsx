import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import FormPage from './form-page';
import * as S from './working-hours-review.style';
import DayHoursRows from '../day-hours/day-hours-rows';
import type { WorkingDay } from '../../utils/types';

type WorkingHoursReviewProps = {
  days: WorkingDay[];
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

// Last check of every weekday's hours before the bank's default working hours are saved
const WorkingHoursReview = ({ days, loading, onConfirm, onCancel }: WorkingHoursReviewProps) => {
  const [t] = useTr();

  return (
    <FormPage
      footer={
        <>
          <Button htmlType='button' type='primaryOutlined' disabled={loading} onClick={onCancel}>
            {t('cancel')}
          </Button>
          <Button htmlType='button' type='primary' disabled={loading} loading={loading} onClick={onConfirm}>
            {t('confirm_final')}
          </Button>
        </>
      }
    >
      <S.Title>
        <i className='ri-time-line' />
        {t('default_title_value')}
      </S.Title>
      <DayHoursRows days={days} />
    </FormPage>
  );
};

export default WorkingHoursReview;

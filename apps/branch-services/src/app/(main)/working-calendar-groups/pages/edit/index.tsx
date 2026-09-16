import { useTr } from '@branch-services/translation';

type EditWorkingCalendarGroupProps = {
  id?: string | null;
};

const EditWorkingCalendarGroup = ({ id }: EditWorkingCalendarGroupProps) => {
  const [t] = useTr();

  return <div>{t('edit_group_placeholder', { id })}</div>;
};

export default EditWorkingCalendarGroup;

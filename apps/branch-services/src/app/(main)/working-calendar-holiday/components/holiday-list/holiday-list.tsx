import { useTr } from '@branch-services/translation';

import OfficialList from './official/official-list';
import CustomList from './custom/custom-list';
import useHolidayStore from '../../store/use-widget-store';
import { HolidayTab } from '../../utils/constants';

import * as S from './holiday-list.style';

const HolidayList = () => {
  const [t] = useTr();
  const activeTab = useHolidayStore((state) => state.activeTab);
  const setActiveTab = useHolidayStore((state) => state.setActiveTab);

  return (
    <S.ListTabs
      activeKey={activeTab}
      onChange={(key) => setActiveTab(key as HolidayTab)}
      destroyInactiveTabPane
      items={[
        { key: HolidayTab.OFFICIAL, label: t('official_tab'), children: <OfficialList /> },
        { key: HolidayTab.CUSTOM, label: t('custom_tab'), children: <CustomList /> },
      ]}
    />
  );
};

export default HolidayList;

import { useState } from 'react';

import { useTr } from '@branch-services/translation';

import ManualForm from '../manual-form/manual-form';
import UploadForm from '../upload-form/upload-form';

import * as S from './create-page.style';

enum CreateTab {
  UPLOAD = 'upload',
  MANUAL = 'manual',
}

// New holidays: official ones by uploading a file, others entered by hand
const CreatePage = () => {
  const [t] = useTr();
  const [activeTab, setActiveTab] = useState(CreateTab.UPLOAD);

  return (
    <S.CreateTabs
      activeKey={activeTab}
      onChange={(key) => setActiveTab(key as CreateTab)}
      destroyInactiveTabPane
      items={[
        { key: CreateTab.UPLOAD, label: t('upload_tab'), children: <UploadForm /> },
        { key: CreateTab.MANUAL, label: t('manual_tab'), children: <ManualForm /> },
      ]}
    />
  );
};

export default CreatePage;

import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import useDownloadFileMutation from '../../queries/use-download-file-mutation';
import Utils from '../../utils/utils';

const SampleFileLink = () => {
  const [t] = useTr();
  const handleDownloadMenuClick = async () => {
    Utils.getLocalFile();
  };
  return (
    <Button
      htmlType='button'
      type='link'
      style={{ width: 'fit-content', padding: 0, fontSize: '1.4rem' }}
      // loading={download.isPending}
      onClick={handleDownloadMenuClick}
    >
      {t('download_sample_file')}
      <i className='ri-download-line ri-2x'></i>
    </Button>
  );
};

export default SampleFileLink;

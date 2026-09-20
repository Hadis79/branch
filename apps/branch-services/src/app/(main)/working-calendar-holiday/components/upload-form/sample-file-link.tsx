import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import useDownloadFileMutation from '../../queries/use-download-file-mutation';
import { Api } from '../../services';

const SampleFileLink = () => {
  const [t] = useTr();
  const download = useDownloadFileMutation();

  return (
    <Button
      htmlType='button'
      type='link'
      style={{ width: 'fit-content', padding: 0, fontSize: '1.4rem' }}
      loading={download.isPending}
      onClick={() => download.mutate(Api.downloadSampleFile)}
    >
      {t('download_sample_file')}
      <i className='ri-download-line ri-2x'></i>
    </Button>
  );
};

export default SampleFileLink;

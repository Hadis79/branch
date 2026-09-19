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
      icon={<i className='ri-download-2-line' />}
      loading={download.isPending}
      onClick={() => download.mutate(Api.downloadSampleFile)}
    >
      {t('download_sample_file')}
    </Button>
  );
};

export default SampleFileLink;

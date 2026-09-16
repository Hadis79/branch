import { columns, mobileColumns } from './column';
import useNewRequestsWidgetStore from '../../../store/use-widget-store';
import { Table } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';
import useFileDetailsQuery from '../../../queries/use-get-file-details-query';

const FileList = ({ stateList }) => {
  const {
    refetch: refetchFileDetails,
    data: fileDetailsData,
    isFetching: fileDetailsIsFetching,
  } = useFileDetailsQuery();
  const [t] = useTr();

  const { pagination: paginationStore, setPagination } = useNewRequestsWidgetStore();

  const handleOnChange = (pagination) => {
    const current = pagination.current;

    const size = pagination.pageSize;

    const paginationInfo = {
      ...paginationStore,
      current: current,
      page: current - 1,
      size: size,
    };
    setPagination(paginationInfo);
  };
  return (
    <Table
      title={t('transfer_list')}
      dataSource={fileDetailsData?.content}
      columns={columns(t, paginationStore, paginationStore?.page as any)}
      onChange={handleOnChange}
      hasContainer={true}
      rowKey={'id'}
      total={fileDetailsData?.totalElements}
      current={paginationStore.current}
      loading={fileDetailsIsFetching}
    />
  );
};

export default FileList;

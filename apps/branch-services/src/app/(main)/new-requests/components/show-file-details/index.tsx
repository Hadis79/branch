import { useEffect } from 'react';

import FileList from './list';
import TopSection from './top-section';
import useFileDetailsQuery from '../../queries/use-get-file-details-query';
import useNewRequestsWidgetStore from '../../store/use-widget-store';

const ShowFileDetails = () => {
  const {
    validateResponse,
    checkValidationResponse,
    pagination: paginationInquiry,
    filter,
  } = useNewRequestsWidgetStore();
  const {
    refetch: refetchFileDetails,
    data: fileDetailsData,
    isFetching: fileDetailsIsFetching,
  } = useFileDetailsQuery();

  // useEffect(() => {
  //   getListData();
  // }, [paginationInquiry.size, paginationInquiry.count, filter]);
  //
  // async function getListData() {
  //   refetchFileDetails();
  // }

  return (
    <>
      <TopSection stateList={fileDetailsData?.content} />
      <FileList stateList={fileDetailsData?.content} />
    </>
  );
};

export default ShowFileDetails;

import { Box } from '@branch-services/ui-kit';
import { ApiUtil } from '@branch-services/utils';

import ServiceFilter from './filter/service-filter';
import ServiceTable from './data-table/service-table';
import ServiceMessage from '../message/service-message';
import useServicesQuery from '../../queries/use-services-query';
import ServiceEmptyState from './empty-state/service-empty-state';
import useEmptyServiceList from '../../hooks/use-empty-service-list';

const ServiceList = () => {
  const { error } = useServicesQuery();
  const isEmptyList = useEmptyServiceList();

  // Nothing added yet (not just an empty search result)
  if (isEmptyList) return <ServiceEmptyState />;

  return (
    <>
      {error && (
        <Box padding='2.4rem 3.2rem 0'>
          <ServiceMessage message={ApiUtil.getErrorMessage(error)} />
        </Box>
      )}
      <ServiceFilter />
      <ServiceTable />
    </>
  );
};

export default ServiceList;

import { Box } from '@branch-services/ui-kit';
import { ApiUtil } from '@branch-services/utils';

import ServiceFilter from './filter/service-filter';
import ServiceTable from './data-table/service-table';
import ServiceEmptyState from './empty-state/service-empty-state';
import ServiceMessage from '../message/service-message';
import useServicesQuery from '../../queries/use-services-query';
import useServiceStore from '../../store/use-widget-store';

const ServiceList = () => {
  const hasFilter = useServiceStore((state) => Boolean(state.filter.name));
  const { data, error, isPending } = useServicesQuery();

  // Nothing added yet (not just an empty search result)
  if (!isPending && !error && !data?.totalElements && !hasFilter) return <ServiceEmptyState />;

  return (
    <Box flexDirection='column' width='100%'>
      {error && <ServiceMessage message={ApiUtil.getErrorMessage(error)} margin='2.4rem 3.2rem 0' />}
      <ServiceFilter />
      <ServiceTable />
    </Box>
  );
};

export default ServiceList;

import { Skeleton } from 'antd';

import { Box } from '@branch-services/ui-kit';

import * as S from './loading-skeletons.style';

export const PageSkeleton = () => <Skeleton active round title={{ width: '35%' }} paragraph={{ rows: 7 }} />;

// A section title over collapsed duty cards
const CardsSkeleton = ({ count }: { count: number }) => (
  <Box flexDirection='column' gap='1.2rem'>
    <Skeleton.Input active size='small' style={{ width: '16rem' }} />
    {Array.from({ length: count }, (_, index) => (
      <S.Card key={index}>
        <Skeleton.Input active size='small' style={{ width: '24rem' }} />
        <Skeleton.Button active size='small' style={{ width: '7rem' }} />
      </S.Card>
    ))}
  </Box>
);

export const DutyListSkeleton = () => (
  <Box flexDirection='column' flexGrow={1} gap='2.4rem' padding='3.2rem'>
    <CardsSkeleton count={2} />
    <CardsSkeleton count={3} />
  </Box>
);

export const FieldSkeleton = () => <Skeleton.Input active block style={{ height: '4rem' }} />;

export const TableSkeleton = ({ rows }: { rows: number }) => (
  <Box flexDirection='column'>
    {Array.from({ length: rows }, (_, index) => (
      <S.TableRow key={index}>
        <Skeleton.Input active block size='small' />
        <Skeleton.Input active block size='small' />
        <Skeleton.Input active block size='small' />
      </S.TableRow>
    ))}
  </Box>
);

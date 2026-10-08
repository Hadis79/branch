import { Skeleton } from 'antd';

import { Box } from '@branch-services/ui-kit';

import * as S from './loading-skeletons.style';

export const PageSkeleton = () => <Skeleton active round title={{ width: '35%' }} paragraph={{ rows: 7 }} />;

export const DefaultCardSkeleton = () => (
  <S.DefaultCard>
    <S.DefaultHeader>
      <Skeleton.Input active size='small' style={{ width: '20rem' }} />
      <Skeleton.Button active size='small' style={{ width: '7rem' }} />
    </S.DefaultHeader>
    <S.Chips>
      {Array.from({ length: 7 }, (_, index) => (
        <Skeleton.Input key={index} active block size='small' />
      ))}
    </S.Chips>
  </S.DefaultCard>
);

export const ExceptionCardsSkeleton = () => (
  <Box width='100%' flexDirection='column' gap='1.2rem'>
    <Skeleton.Input active size='small' style={{ width: '16rem' }} />
    {Array.from({ length: 2 }, (_, index) => (
      <S.ExceptionCard key={index}>
        <S.CardHeader>
          <Skeleton.Input active size='small' style={{ width: '24rem' }} />
          <Skeleton.Button active size='small' style={{ width: '7rem' }} />
        </S.CardHeader>
      </S.ExceptionCard>
    ))}
  </Box>
);

export const SummarySkeleton = () => (
  <Box width='100%' flexDirection='column' gap='1.6rem'>
    <Skeleton active round title={{ width: '70%' }} paragraph={{ rows: 4 }} />
  </Box>
);

export const FieldSkeleton = () => <Skeleton.Input active block style={{ height: '4rem' }} />;

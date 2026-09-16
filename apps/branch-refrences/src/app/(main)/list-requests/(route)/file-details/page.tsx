'use client';
import { DetailsHistoryTable } from '@branch-services/components';
import React from 'react';
import { useSearchParams } from 'next/navigation';

function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const ssn = searchParams.get('ssn');
  const status = searchParams.get('status');
  const requestType = searchParams.get('requestType');
  return (
    <DetailsHistoryTable
      id={id as string}
      ssn={ssn as string}
      status={status as string}
      serviceUrl='inquiry-details'
      requestType={requestType as string}
    />
  );
}

export default Page;

'use client';
import { FileDetailsTable } from '@branch-services/components';
import React from 'react';
import { useSearchParams } from 'next/navigation';

function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const ssn = searchParams.get('ssn');
  return <FileDetailsTable id={id as string} ssn={ssn as string} serviceUrl='inquiry-details' />;
}

export default Page;

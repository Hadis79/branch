'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { FileDetailsTable } from '../../components/file-details/file-details';

function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  return <FileDetailsTable requestId={id as string} />;
}

export default Page;

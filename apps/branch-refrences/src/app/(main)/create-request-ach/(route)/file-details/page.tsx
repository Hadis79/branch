'use client';
import { FileDetailsTable } from '@branch-services/components';
import React from 'react';
import { useWidgetStore } from '../../store';

function Page() {
  const { formValues, uploadResponse } = useWidgetStore((state) => state);
  return <FileDetailsTable id={uploadResponse?.id as string} ssn={formValues?.ssn as string} serviceUrl='details' />;
}

export default Page;

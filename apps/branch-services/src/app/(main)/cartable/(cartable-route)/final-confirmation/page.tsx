'use client';
import React from 'react';

import { useTr } from '@branch-services/translation';
import FinalConfirmation from '../../components/final-confirmation/final-confirmation';

function Page() {
  const [t] = useTr();
  return <FinalConfirmation />;
}

export default Page;

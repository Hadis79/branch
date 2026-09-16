'use client';

import { Box } from '@branch-services/ui-kit';
import { Spin } from 'antd';
import React from 'react';

function Loading() {
  return (
    <Box justifyContent='center' alignItems='center' height='100%'>
      <Spin size='large' />
    </Box>
  );
}

export default Loading;

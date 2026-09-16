import React, { CSSProperties } from 'react';

import { Spin, SpinProps as AntSpinProps } from 'antd';
import { Box, BoxProps } from '../box/box';

export type LoadingProps = AntSpinProps & {
  // children?: React.ReactNode;
  containerProps?: BoxProps;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
};

export const Loading = (props: LoadingProps) => {
  const { width = '100%', height = 'min-content', containerProps = {}, ...rest } = props;
  containerProps.alignItems = 'center';
  containerProps.justifyContent = 'center';

  return (
    <Box width={width} height={height} {...containerProps}>
      <Spin {...rest} />
    </Box>
  );
};

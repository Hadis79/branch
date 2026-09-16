import { ReactNode } from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { StyleSheetManager } from 'styled-components';

interface IDirectionalityProps {
  isRtl: boolean;
  children: ReactNode;
}

export const Directionality = (props: IDirectionalityProps) => {
  const stylisPlugins = props.isRtl ? [rtlPlugin] : [];
  return <StyleSheetManager stylisPlugins={stylisPlugins as any}>{props.children}</StyleSheetManager>;
};

// export default Directionality;

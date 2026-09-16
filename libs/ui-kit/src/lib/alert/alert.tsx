import styled from 'styled-components';
import { Alert as AntAlert, AlertProps as AntAlertProps } from 'antd';

export type AlertProps = AntAlertProps & {
  // children?: React.ReactNode;
};

const StyledAlert = styled(AntAlert)``;

export const Alert = (props: AlertProps) => {
  const { ...rest } = props;

  return <StyledAlert {...rest} />;
};

// export default Button;

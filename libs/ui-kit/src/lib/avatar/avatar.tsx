import styled from 'styled-components';
import { Avatar as AntAvatar, AvatarProps as AntAvatarProps } from 'antd';

export type AvatarProps = AntAvatarProps & {
  // children?: React.ReactNode;
};

const StyledAvatar = styled(AntAvatar)``;

export const Avatar = (props: AvatarProps) => {
  const { ...rest } = props;

  return <StyledAvatar {...rest} />;
};

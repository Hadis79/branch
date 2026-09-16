import styled from 'styled-components';
import { MessageBox } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import useGroupStore from '../../store/use-widget-store';

const MessageWrapper = styled.div`
  padding: 1.4rem 3.2rem 0;
`;

// Message box of the module; its content is managed through hooks/use-group-message.
const GroupMessage = () => {
  const [t] = useTr();
  const message = useGroupStore((state) => state.message);
  const resetMessage = useGroupStore((state) => state.resetMessage);

  if (!message) return null;

  const { linkProps, shouldTranslate, txt, ...messageProps } = message;

  return (
    <MessageWrapper>
      <MessageBox
        {...messageProps}
        message={shouldTranslate ? t(txt) : txt}
        closable
        shouldScroll
        linkProps={
          linkProps && {
            title: linkProps.title as string,
            url: linkProps.url as string,
          }
        }
        onClose={resetMessage}
      />
    </MessageWrapper>
  );
};

export default GroupMessage;

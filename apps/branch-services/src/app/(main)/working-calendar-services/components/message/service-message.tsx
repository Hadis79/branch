import { MessageModel } from '@branch-services/types';
import { useTr } from '@branch-services/translation';
import { MessageBox, MessageBoxProps } from '@branch-services/ui-kit';

type ServiceMessageProps = Pick<MessageBoxProps, 'margin' | 'closable' | 'shouldScroll' | 'onClose'> & {
  message: MessageModel;
};

// Shows a store / service message (translated when it holds a translation key)
const ServiceMessage = ({ message, ...boxProps }: ServiceMessageProps) => {
  const [t] = useTr();

  return (
    <MessageBox
      message={message.shouldTranslate ? t(message.txt) : message.txt}
      type={message.type}
      subErrors={message.subErrors}
      {...boxProps}
    />
  );
};

export default ServiceMessage;

import { useTr } from '@branch-services/translation';
import { MessageBox } from '@branch-services/ui-kit';

import ServiceList from '../service-list/service-list';
import ServiceFormModal from '../service-form-modal/service-form-modal';
import useServiceStore from '../../store/use-widget-store';

const App = () => {
  const [t] = useTr();
  const message = useServiceStore((state) => state.message);
  const setMessage = useServiceStore((state) => state.setMessage);

  return (
    <>
      {message && (
        <MessageBox
          message={message.shouldTranslate ? t(message.txt) : message.txt}
          type={message.type}
          subErrors={message.subErrors}
          closable
          shouldScroll
          margin='2.4rem 3.2rem 0'
          onClose={() => setMessage(null)}
        />
      )}
      <ServiceList />
      <ServiceFormModal />
    </>
  );
};

export default App;

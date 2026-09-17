import { useTr } from '@branch-services/translation';

import useCreateServiceMutation from '../queries/use-create-service-mutation';
import useUpdateServiceMutation from '../queries/use-update-service-mutation';
import useServiceStore from '../store/use-widget-store';
import type { ServiceFormValues } from '../utils/types';

// Saves the open service modal: creates or updates, then reports success and closes it
const useSaveService = () => {
  const [t] = useTr();
  const activeModal = useServiceStore((state) => state.activeModal);
  const selectedService = useServiceStore((state) => state.selectedService);
  const closeModal = useServiceStore((state) => state.closeModal);
  const setMessage = useServiceStore((state) => state.setMessage);
  const createService = useCreateServiceMutation();
  const updateService = useUpdateServiceMutation();

  const isEdit = activeModal === 'edit';
  const mutation = isEdit ? updateService : createService;

  const close = () => {
    createService.reset();
    updateService.reset();
    closeModal();
  };

  const save = ({ name, englishName, active }: ServiceFormValues) => {
    const onSuccess = () => {
      setMessage({
        txt: t(isEdit ? 'update_service_success' : 'create_service_success', { serviceName: name }),
        type: 'success',
        shouldTranslate: false,
      });
      close();
    };

    if (isEdit && selectedService) {
      updateService.mutate({ id: selectedService.id, name, englishName, active }, { onSuccess });
    } else {
      createService.mutate({ name, englishName }, { onSuccess });
    }
  };

  return {
    isOpen: activeModal !== null,
    isEdit,
    selectedService,
    save,
    close,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};

export default useSaveService;

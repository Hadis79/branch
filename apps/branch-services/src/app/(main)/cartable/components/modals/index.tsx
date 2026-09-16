import React from 'react';
import { Modal } from 'antd';

import { useModalsList } from './use-cartabl-modals-list';
import useCartableStore from '../../store/use-cartable-store';

const CartablModals = () => {
  const { modalType } = useCartableStore();
  const { modalsList } = useModalsList();

  return (
    <Modal
      centered
      title={modalType ? modalsList[modalType]?.title : ''}
      open={!!modalType}
      closable={false}
      footer={null}
    >
      {modalType ? modalsList[modalType]?.component : null}
    </Modal>
  );
};

export default CartablModals;

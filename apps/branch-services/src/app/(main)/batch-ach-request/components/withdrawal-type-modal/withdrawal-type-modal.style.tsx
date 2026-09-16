import { Modal } from 'antd';
import styled from 'styled-components';

export const ModalWrapper = styled(Modal)`
  .modal {
    &__header {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      margin-bottom: 2.4rem;
    }

    &__title {
      font-size: 1.6rem;
      font-weight: 700;
      color: ${(p) => p.theme.textPrimary};
    }

    &__desc {
      font-size: 1.4rem;
      color: ${(p) => p.theme.textSecondary};
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
  }

  .withdrawal-method {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1.6rem;
    border-radius: 0.8rem;
    background-color: ${(p) => p.theme.backgroundLight};
    cursor: pointer;

    &:hover {
      background-color: ${(p) => p.theme.backgroundDark};
    }

    &__icon {
      font-size: 2rem;
      color: ${(p) => p.theme.textSecondary};
      align-self: flex-start;
    }

    &__icon-arrow {
      font-size: 2rem;
      margin-inline-start: auto;
      color: ${(p) => p.theme.textSecondary};
    }

    &__desc {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    &__title {
      font-size: 1.4rem;
      font-weight: 600;
      color: ${(p) => p.theme.textPrimary};
    }

    &__subtitle {
      font-size: 1.2rem;
      color: ${(p) => p.theme.textSecondary};
    }
  }
`;

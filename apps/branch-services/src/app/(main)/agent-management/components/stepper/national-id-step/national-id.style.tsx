import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';
import { MessageBox } from '@branch-services/ui-kit';

export const HeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.6rem;

  .divider {
    border-color: ${(p) => p.theme.textQuaternary};
  }

  .ant-divider-horizontal {
    min-width: unset;
    margin-inline-end: 3rem;
  }

  .heading {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 4.8rem;
    overflow: hidden;
    font-weight: 700;
    font-size: 1.4rem;

    ${respondTo.down('xs')} {
      margin-block: 1rem;
    }
  }

  .section__title {
    font-weight: 500;
    white-space: nowrap;
    margin-inline-end: 2.4rem;
    font-size: 1.6rem;

    ${respondTo.down('md')} {
      font-size: 1.5rem;
    }
  }
`;

export const ItemWrapper = styled.div`
  padding: 1.2rem 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  background: ${(p) => p.theme.backgroundLight};
  border-radius: 1rem;

  &,
  * {
    user-select: text !important;
    -webkit-user-select: text !important;
  }

  .info-item__title {
    font-size: 1.4rem;
    font-weight: normal;
  }

  .info-item__value {
    justify-content: space-between;
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

export const ReceiverBoxWrapper = styled.div`
  .swiper-pagination {
    position: inherit;
    width: 100%;
    height: 100%;
    max-height: 42rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 3rem;

    .swiper-pagination-bullet {
      width: 32px;
      height: 32px;
      background: unset;
      color: ${(props) => props.theme.textPrimary};
      opacity: 1;
      padding-top: 0.5rem;

      &.swiper-pagination-bullet-active {
        border: 1px solid ${(props) => props.theme.textPrimary};
        border-color: ${(props) => props.theme.primary};
        border-radius: 0.8rem;
      }
    }
  }

  //.custom-prev,
  //.custom-next {
  //  height: 3.2rem !important;
  //  width: 3.2rem !important;
  //  position: absolute;
  //  z-index: 20;
  //  border: none;
  //  background: none;
  //  cursor: pointer;
  //  bottom: 1rem;
  //}
  //
  //.custom-prev {
  //  left: 40%;
  //}
  //
  //.custom-next {
  //  right: 40%;
  //}
`;

export const ReceiverBoxStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3.2rem;
`;

export const DeleteButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DeleteButton = styled.span`
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.error};
  cursor: pointer;
`;

export const CustomMessageBox = styled(MessageBox)`
  background-color: ${(p) => p.theme.backgroundLight};
  border: none;
  color: ${(props) => props.theme.textPrimary};
  padding: 1rem 2rem 1rem 2.4rem;
  font-weight: 500;
  margin-bottom: 2.4rem;

  svg {
    width: 18px;
    height: 18px;
  }

  .ant-alert-icon > * {
    color: ${(p) => p.theme.textPrimary};
  }
`;

import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';
import { PageKind } from '../../utils/consts';
interface FormLoginProps {
  pageKind?: PageKind;
}

export const LoginWrapperTop = styled.div`
  margin: 0;
  height: 50%;
  background-image: linear-gradient(
    to right,
    ${(p) => p.theme.gradientBackgroundFirst},
    ${(p) => p.theme.gradientBackgroundSecound}
  );
  .main {
    display: flex;
    color: #ffffff;
    justify-content: space-between;
    .child {
      display: flex;
      margin: 3.6rem 4.5rem;
      column-gap: 3.2rem;
    }
  }

  img {
    width: min-content;
    height: 3.2rem;
    object-fit: scale-down;
    margin: 3.6rem 4.5rem;
    ${respondTo.down('md')} {
      height: 4rem !important;
      margin: 2rem 2rem !important;
    }
  }
`;
export const LoginWrapperDown = styled.div`
  margin: 0;
  height: 50%;
  background-color: ${(p) => p.theme.backgroundRefrence};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const FormLogin = styled.div<FormLoginProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(p) => p.theme.backgroundRefrence};
  border-radius: 1rem;
  border: 0.1rem solid ${(p) => p.theme.borderUser};
  box-shadow: 0 8.2rem 4rem -1.4rem rgba(100, 100, 100, 0.08);
  width: 57.2rem;
  ${respondTo.down('md')} {
    max-width: 46rem;
    padding: 6rem 4.4rem;
    min-height: 61.8rem !important;
    max-height: 82rem !important;
    height: auto !important;
  }
  height: ${(p) => (p.pageKind === PageKind.CARD ? '76rem' : '61.8rem')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10rem 7.4rem;
  justify-self: center;
  .ant-form {
    width: -webkit-fill-available;
  }

  .ant-input-lg {
    height: 4rem;
    font-size: 1.4rem;
    ${respondTo.down('md')} {
      font-size: 1.5rem !important;
      height: 5rem;
    }
  }

  .ant-select-selector {
    font-size: 1.4rem;
    ${respondTo.down('md')} {
      font-size: 1.5rem !important;
    }
  }

  .top-form {
    display: flex;
    flex-direction: column;
    width: -webkit-fill-available;
    text-align: left;
    gap: 0.8rem !important;
    .title {
      font-size: 1.8rem;
      font-weight: 500;
      margin: 0;
    }
    .description {
      font-size: 1.4rem;
      margin: 0;
    }
    ${respondTo.down('md')} {
      .title {
        font-size: 2rem;
        font-weight: 500;
      }
      .description {
        font-size: 1.75rem;
      }
    }
  }
`;

export const SubmitWrapper = styled.div`
  margin-top: 3.2rem;

  /* ${respondTo.down('xl')} {
    grid-template-columns: 1fr;
  } */

  .account__owner-name-text {
    display: flex;
    gap: 0.4rem;
    font-size: 1.2rem;
    color: ${(p) => p.theme.textPrimary};
    font-weight: 300;
    margin-top: 0.4rem;

    ${respondTo.down('md')} {
      font-size: 1.5rem !important;
    }
  }
`;

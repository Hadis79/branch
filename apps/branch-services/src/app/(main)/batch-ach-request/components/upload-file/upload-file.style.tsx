import styled from 'styled-components';
import { cssVar, respondTo } from '@branch-services/utils';
import { Box, Panel } from '@branch-services/ui-kit';

export const SubmitInformationWrapper = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: 48% 52%;
  /* padding: 3.2rem; */

  ${respondTo.down('xl')} {
    grid-template-columns: 1fr;
  }

  .ant-fom .ant-typography:active,
  .ant-typography:focus,
  .ant-typography:hover,
  .ant-typography:link,
  .ant-typography:visited {
    color: ${(props) => props.theme.primary};
  }

  .rounded-box-container {
    border: 1px solid ${(p) => p.theme.border};
    border-radius: var(${cssVar.radius});
    display: flex;
    flex-wrap: wrap;
    margin: 2.4rem 0;
    padding: 0.5rem 1.6rem;

    .rounded-box-container__layout__inline {
      .ant-form-item-label {
        padding: 0;
        ${respondTo.down('lg')} {
          flex: none !important;
        }
      }

      .ant-form-item {
        margin-bottom: 0;
        margin-top: 0;
      }

      .ant-form-item-row {
        flex-direction: initial;
        justify-content: space-between;
      }

      .ant-form-item-control {
        width: fit-content;
        display: flex;
        flex-direction: row-reverse;
        ${respondTo.down('lg')} {
          flex: none !important;
        }
      }
    }

    .ant-form-item-label {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .ant-form-item {
      margin: 0.8rem 0;
    }

    .ant-collapse {
      margin: 0.8rem 0;
    }
  }

  .optional-fields {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    margin: 2.4rem 0;
  }

  .radio-group-item {
    display: flex;
    flex-direction: column;
    padding: 0.8rem;
  }

  .radio-group-label {
    display: flex;
    align-items: flex-start;
  }

  .radio-group-item.selected {
    background-color: ${(props) => props.theme.primaryLight} !important;
    border-radius: var(${cssVar.radius});
    /* padding: 0.8rem; */
    transition: background-color 1s;
  }

  .radio-group-description {
    font-size: 12px;
    padding-left: 2rem !important;
  }

  & .download-button {
    max-width: max-content;
    text-align: center;
    height: 4rem;
    padding: 0.9rem 3.7rem;
    flex-grow: 0;
    font-size: 1.4rem;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${(props) => props.theme.primary};
    border-radius: 6px;
    border: solid 1px;
  }

  .split_check_box {
    .ant-checkbox-wrapper {
      width: auto;

      .ant-checkbox-inner {
        width: 1.8rem;
        height: 1.8rem;
      }
    }

    .text_check_box {
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      font-weight: normal;
      color: ${(props) => props.theme.textSecondary};
    }
  }
  .upload-info-box {
    margin: 0;
    font-size: 1.8rem;
    color: ${(props) => props.theme.textPrimary};
  }

  .ant-upload-list-item-error {
    padding: 1.8rem 0.8rem;
    border-radius: 0.8rem;
    margin-top: 0.8rem !important;
    .ant-upload-icon {
      font-size: 3.2rem;
    }
    .ant-upload-list-item-actions {
      font-size: 3.2rem;
      padding-top: 0.4rem;
    }
  }

  .iban_rounded-box-container {
    border: 1px solid ${(p) => p.theme.border};
    border-radius: var(${cssVar.radius});
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 3rem 0;
    padding: 1.3rem 1.6rem;
    background: ${(p) => p.theme.cardColor};

    a {
      color: ${(p) => p.theme.primary};
    }
  }
`;

export const ImageWrapper = styled(Box)`
  margin-top: 1rem;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  align-items: center;

  ${respondTo.down('xl')} {
    display: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.6rem;
  margin-top: 4rem;

  .reject-form__button {
    width: 12rem;
    border-color: ${(props) => props.theme.primary};
  }

  .continue-form__button {
    width: 12.2rem;
  }
`;

export const PaymentTypePanel = styled(Panel)`
  font-weight: 500;
  padding: 2.4rem 1.6rem;
  box-shadow: none;
  border: 1px solid ${(props) => props.theme.border};
  row-gap: 2.4rem;

  & .ant-form-item {
    margin: 0;
  }

  & .ant-radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .radio-group-item {
    display: flex;
    flex-direction: column;
    padding: 0.8rem;
  }

  .radio-group-label {
    display: flex;
    align-items: flex-start;
  }

  .radio-group-item.selected {
    background-color: ${(props) => props.theme.primaryLight} !important;
    border-radius: var(${cssVar.radius});
    /* padding: 0.8rem; */
    transition: background-color 1s;
  }

  .radio-group-description {
    font-size: 12px;
    padding-left: 2rem !important;
  }

  & .type-info-row {
    display: grid;
    grid-template-columns: max-content auto;
    align-items: start;
    column-gap: 3.2rem;
    white-space: break-spaces;

    & .type-title-container {
      justify-content: flex-start;
      align-items: center;
      gap: 0.8rem;
      text-wrap: nowrap;
    }

    & p {
      margin: 0;
    }
  }
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 1rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: var(${cssVar.radius});
  margin-top: 0.4rem;

  i {
    cursor: pointer;
    font-size: 2rem;
  }

  .ant-upload-list-item {
    margin-top: 0;
    flex-grow: 1;
  }
`;
export const StyledHelperText = styled.div`
  margin-bottom: 1rem;
  .error-text {
    color: ${(props) => props.theme.error};
    font-size: 1.2rem;
  }
`;

export const UploadFileContainer = styled.div<{ fileRequiredError: boolean | null }>`
  .ant-upload {
    border: 1px dashed ${(p) => (p.fileRequiredError ? p.theme.error : p.theme.border)};
    border-radius: 10px;
  }
  .dragger-style {
    margin-bottom: 0;
  }
`;

export const ButtonWrapper = styled(Box)`
  & .ant-btn {
    flex-basis: fit-content;
    padding: 0.7rem 3rem;
    min-width: 12rem;
  }
`;

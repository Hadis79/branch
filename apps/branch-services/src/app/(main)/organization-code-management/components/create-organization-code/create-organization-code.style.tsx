import styled from 'styled-components';

export const PageShell = styled.div`
  min-height: 55rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 3.2rem;
  > form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const FormAndGuide = styled.div`
  display: grid;
  grid-template-columns: minmax(30rem, 1fr) minmax(24rem, 1fr);
  gap: 6.4rem;
  padding-top: 2.4rem;
`;

export const FormFields = styled.div`
  .ant-form-item {
    .ant-form-item-label {
      padding: 0 0 2px !important;
    }
  }

  .organization-code-input {
    .ant-input-suffix {
    }

    .organization-code-inquiry {
      font-size: 1.2rem;
    }
  }
`;

export const Guide = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 0.8rem;

  p {
    display: flex;
    align-items: baseline;
    gap: 0.8rem;
    margin: 1.6rem 0 0;
    text-align: center;
    color: ${(props) => props.theme.textPrimary};
    line-height: 2;
  }
`;

export const SummarySection = styled.section`
  > div:first-child:not(:last-child) {
    margin-bottom: 2.4rem;
  }
`;

export const PageActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: auto;
  padding-top: 3.2rem;

  button {
    min-width: 14rem;
  }
`;

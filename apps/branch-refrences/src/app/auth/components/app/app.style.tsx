import styled from 'styled-components';

export const AppContainer = styled.div`
  // background-color: pink;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: end;
  margin-top: 3.2rem;

  button {
    min-width: 12.4rem;
  }
  .submit {
    width: -webkit-fill-available;
  }
`;

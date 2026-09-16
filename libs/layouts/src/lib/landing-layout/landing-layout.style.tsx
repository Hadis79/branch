import styled from 'styled-components';

export const ChildrenStyled = styled.div`
  width: 100%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .not-found-page,
  .not-access-page {
    width: 100%;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    gap: 2.4rem;
    align-items: center;

    .not-found-msg,
    .not-access-msg {
      font-size: 1.6rem;
      font-weight: 700;
    }
    .return-home {
      font-size: 1.8rem;
      text-decoration: none;

      button {
        width: 14rem;
        height: 4.8rem;
      }
    }
    .not-found-desc,
    .not-access-desc {
      font-weight: 500;
    }
  }

  .server-error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;

    .error__title {
      font-weight: 700;
      font-size: 1.8rem;
    }
    .error__desc {
      font-weight: 500;
      font-size: 1.6rem;
      color: ${(p) => p.theme.textSecondary};
    }
    & .user_error_state {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;

      .error_text {
        text-align: center;
        max-width: 20rem;
      }

      .ant-btn {
        font-weight: 500;
        width: 13.6rem;
        padding: 0.8rem 1.6rem;
      }
    }
  }
`;

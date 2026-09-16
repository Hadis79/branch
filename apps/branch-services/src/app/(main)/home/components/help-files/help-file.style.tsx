import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 3.2rem;

  .title_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .help_files_title,
  .help_files_desc {
    font-size: 14px;
    font-weight: 700;
  }
  .help_files_desc {
    font-weight: 400;
  }
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: ${(p) => p.theme.surface};
  border-radius: 0.8rem;
  box-shadow: 0px 0px 48px -6px rgba(35, 21, 91, 0.06);
`;
export const Item = styled.a`
  width: 100%;
  padding: 1.6rem;
  gap: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${(p) => p.theme.textPrimary};
  transition: 0.15s linear;

  :hover {
    background-color: ${(p) => p.theme.background};
    border-radius: 0.8rem;
    cursor: pointer;
  }

  .download_btn {
    display: flex;
    font-size: 1.4rem;
    align-items: center;
    gap: 0.4rem;
    i {
      font-size: 1.6rem;
      color: ${(p) => p.theme.primary};
    }
    span {
      color: ${(p) => p.theme.primary};
    }
  }
  .description {
    display: flex;
    font-size: 1.4rem;
    align-items: center;
    gap: 0.4rem;
    span {
      color: ${(p) => p.theme.textPrimary};
    }
    i {
      font-size: 1.6rem;
      color: ${(p) => p.theme.primary};
    }
  }
`;
export const ItemContainer = styled.div`
  color: ${(p) => p.theme.textPrimary};
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

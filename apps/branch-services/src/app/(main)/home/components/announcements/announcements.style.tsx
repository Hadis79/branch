import styled from 'styled-components';

export const Wrapper = styled.div`
  /* background-color: blue; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
`;

export const Announcement = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.6rem 2.4rem;
  gap: 16px;
  border-radius: 0.8rem;
  background-color: ${(p) => p.theme.backgroundLight};

  .title {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 20px;
    text-align: justify;
    color: ${(p) => p.theme.textPrimary};
  }

  .desc {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 22px;
    text-align: justify;
    color: ${(p) => p.theme.textPrimary};
  }
`;

export const Title = styled.div<{ badgeType: string | null }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.8rem;

  .title_badge {
    background-color: ${(props) => (props.badgeType ? props.theme[props.badgeType] : '')};
    color: ${(props) => props.theme.lightGray};
    border-radius: 20px;
    padding: 0.2rem 0.8rem;
  }

  .title_text {
    color: ${(props) => props.theme.textPrimary};
    font-weight: 700;
  }
`;

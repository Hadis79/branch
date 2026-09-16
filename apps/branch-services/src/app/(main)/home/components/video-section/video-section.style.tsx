import styled from 'styled-components';

export const VideoWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2.4rem;

  .info {
    .title {
      font-size: 1.6rem;
    }
    color: ${(p) => p.theme.textPrimary};
    & div:first-child {
      font-weight: 500;
    }
    font-size: 1.4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .pdf {
    a {
      color: ${(p) => p.theme.primary};
      font-size: 1.4rem;
    }
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  .video-container {
    padding: 2rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30rem;
    border-radius: 16px;
    z-index: 2;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px;
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      background-image: linear-gradient(rgba(255, 255, 255, 0) 0px, rgba(0, 0, 0, 0.2) 100%);
      bottom: 3.8rem;
      overflow: hidden;
      width: 100%;
      height: 100%;
      border-radius: 1.6rem;
      inset: 0;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
    }

    .play-btn {
      cursor: pointer;
      z-index: 1;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
    }
  }
`;

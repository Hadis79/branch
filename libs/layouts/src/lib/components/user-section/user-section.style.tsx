import styled from 'styled-components';
import { cssVar, respondTo } from '@branch-services/utils';

export const UserProfileWrapper = styled.div<{ showSider?: boolean }>`
  background: ${(p) => p.theme.surface};
  border-radius: var(${cssVar.radius});

  & .user-section-mobile {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .user-info {
      margin-top: 0.8rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      font-size: 1.6rem;
    }
  }

  & .user-section {
    position: relative;
    background: ${(p) => p.theme.surface};
    display: flex;
    flex-direction: column;
    min-height: fit-content;
    justify-content: center;
    padding: ${(p) => (p.showSider ? '2.4rem 1.6rem' : 0)};
    border-radius: var(${cssVar.radius}) var(${cssVar.radius}) 0 0;

    ${respondTo.down('sm')} {
      padding: 1.8rem;
    }

    & .divider {
      display: ${(p) => (p.showSider ? 'none' : 'block')};
      width: 50%;
      height: 1px;
      background-color: #d5d6d6;
      margin: ${(p) => (p.showSider ? '4rem auto 0' : '2.4rem auto 1.6rem')};
    }

    & .user-section__top-row {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.8rem;

      & .user-avatar-container {
        width: 60px;
        height: 60px;
        flex-shrink: 0; /* prevent from shrinking */
      }

      & .user-info {
        display: ${(props) => (props.showSider ? 'flex' : 'none')};
        opacity: ${(props) => (props.showSider ? 1 : 0)};
        flex-direction: column;
        padding: 0 0.6rem;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
        overflow: hidden; /* hide overflow content */
        height: 9rem;

        & .user-profile-name {
          font-size: 1.6rem;
          font-weight: bold;
          margin-top: 0.8rem;
          color: ${(p) => p.theme.textPrimary};
          line-height: 1;

          /* overflow: hidden; */
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        & .user_error_state {
          height: 100%;
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
            color: ${(p) => p.theme.primary};
            flex-direction: row;

            .ant-btn-icon i {
              font-size: 2.4rem;
            }
          }
        }

        & .user-organization-title {
          font-size: 1.4rem;
        }
        & .user-branch-info {
          font-size: 1.2rem;
        }

        & .user-profile-organization-container {
          font-size: 1.4rem;
          font-weight: normal;
          color: ${(p) => p.theme.textSecondary};

          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    & .user-section__bottom-row {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      margin-top: 2.4rem;

      & > * {
        min-width: 45%;
        font-weight: 300;
        margin-inline: 0.3rem;

        ${respondTo.down('sm')} {
          font-size: 1.4rem;
        }
      }
    }
    &.hide-section {
      justify-content: flex-start;
      padding-top: 2.4rem;
    }
  }
`;

export const ToggleButton = styled.div<{ showSider?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.2rem;
  height: 3.2rem;
  position: absolute;
  background: ${(p) => p.theme.surface};
  box-shadow: 0 0 4px 0px rgba(139, 139, 139, 0.25);
  border-radius: var(--radius);
  right: -1.4rem;
  top: 8rem;
  z-index: 1;
  cursor: pointer;

  & .toggle-icon {
    margin: 0 auto;
    svg {
      vertical-align: middle;
    }
  }
`;

import styled from 'styled-components';
import { Breadcrumb } from 'antd';

export const BreadcrumbStyled = styled(Breadcrumb)`
  ol {
    align-items: center;
  }
  .ant-breadcrumb-separator:last-of-type {
    opacity: 0;
  }
  .ant-breadcrumb-link .is-last-active {
    color: ${(props) => props.theme.primary};
    font-size: 1.4rem;
    font-weight: 500;
  }

  .breadcrumb-action-button {
    cursor: pointer;
    color: ${(props) => props.theme.primary};
    font-size: 1.4rem;
    font-weight: 500;
  }

  .go-back-button-container {
    margin-inline-start: auto;
    cursor: pointer;
    padding-inline: 0.8rem;
    border-radius: 0.8rem;
    transition: all 0.1s linear;

    :hover {
      background-color: ${(p) => p.theme.primaryLight};
    }
    .go-back-button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.8rem;

      i {
        font-size: 2.2rem;
        color: ${(props) => props.theme.primary};
      }
    }
  }
`;

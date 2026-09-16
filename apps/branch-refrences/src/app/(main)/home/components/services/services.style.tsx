import Link from 'next/link';
import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';

export const Wrapper = styled.div`
  .services_title {
    font-size: 1.4rem;
    font-weight: 500;
    color: ${(p) => p.theme.textPrimary};
  }
`;

export const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;
  ${respondTo.down('md')} {
    // grid-template-rows: repeat(2, 1fr) !important;
    grid-template-columns: none;
  }
`;
export const ServiceItem = styled(Link)`
  height: 14rem;
  /* max-width: 22.6rem; */
  border-radius: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.6rem;
  background-color: ${(p) => p.theme.cardColor};
  /* box-shadow: 0px 0px 48px -6px rgba(35, 21, 91, 0.06); */
  transition: all 0.2s linear;
  ${respondTo.down('md')} {
    font-size: 1.5rem;
    height: 10.5rem;
    padding: 1rem 2rem;
  }
  :hover {
    background-color: ${(p) => p.theme.primary};
    transform: translateY(-4px);
  }
  :hover .title {
    color: ${(p) => p.theme.textTerritory};
  }

  .title {
    color: ${(p) => p.theme.textPrimary};
    transition: all 0.2s linear;
    font-weight: 500;
  }
`;

export const DownloadFile = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  justify-content: space-between;
  padding: 2.4rem 2.4rem;
  border-radius: 0.8rem;
  background-color: ${(props) => props.theme.cardColor};
  .text {
    align-content: center;
  }
  .guid {
    font-weight: 700;
  }
  .download {
    justify-content: space-between;
    .sample-file {
      display: flex;
      justify-content: flex-end;
      width: fit-content;
    }
  }
  .files {
    gap: 1.2rem !important;

    display: flex;
    justify-content: space-between;
    ${respondTo.down('md')} {
      font-size: 1.5rem;
      display: flex;
      flex-direction: column;
    }

    .items {
      border-radius: 0.8rem;
      display: flex;
      justify-content: space-between;
      padding: 1.6rem;
      ${respondTo.down('xl')} {
        flex-direction: column;
        align-items: center;
      }
      ${respondTo.down('md')} {
        flex-direction: row;
        align-items: center;
      }
      .ant-btn {
        align-items: normal;
      }
      .sample-file {
        ${respondTo.down('md')} {
          font-size: 1.75rem;
          .ri-download-line {
            font-size: 2.25rem;
          }
        }
      }
      background-color: ${(props) => props.theme.cardSecondaryColor} !important;
    }
  }
  .text-svg {
    display: flex;
    flex-direction: column;
    column-gap: 0.4rem;
  }
  .ant-btn {
    display: flex;
    flex-direction: row;
    padding-bottom: 2.2rem;
  }
  ${respondTo.down('md')} {
    margin-top: 3rem;
    flex-direction: column;
    row-gap: 0.4rem;
    font-size: 1.2rem;
    padding: 1.2rem 1.6rem;
    .text-svg > svg:first-child {
      width: 2rem;
      height: 2rem;
    }
    .ant-btn {
      font-size: 1.2rem;
      width: fit-content;
    }
    .ant-btn-icon {
      .ri-download-line {
        font-size: 1.2rem;
      }
    }
  }
`;

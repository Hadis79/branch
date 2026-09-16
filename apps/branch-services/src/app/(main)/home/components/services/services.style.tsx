import Link from 'next/link';
import styled from 'styled-components';

export const Wrapper = styled.div`
  .services_title {
    font-size: 1.4rem;
    font-weight: 500;
    color: ${(p) => p.theme.textPrimary};
  }
`;

export const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem;
`;
export const ServiceItem = styled(Link)`
  height: 16rem;
  border-radius: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem;
  background-color: ${(p) => p.theme.cardSecondaryColor};
  box-shadow: 0px 0px 48px -6px rgba(35, 21, 91, 0.06);
  transition: all 0.2s linear;

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

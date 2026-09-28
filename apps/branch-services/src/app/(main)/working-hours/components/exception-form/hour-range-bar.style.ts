import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Track = styled.div`
  position: relative;
  height: 2.4rem;
  border-radius: 4px;
  background-color: ${(p) => p.theme.background};
  overflow: hidden;
`;

export const Range = styled.div`
  position: absolute;
  inset-block: 0;
  border-radius: 4px;
  background-color: ${(p) => p.theme.primaryLight};
`;

// A relative track of its own, with each label placed at an explicit physical "left" percentage
// (not a logical property), so the timeline reads left-to-right no matter the page's direction.
export const Labels = styled.div`
  position: relative;
  height: 1.6rem;
  color: ${(p) => p.theme.textSecondary};
  font-size: 1.1rem;
`;

export const Label = styled.span`
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  white-space: nowrap;
`;

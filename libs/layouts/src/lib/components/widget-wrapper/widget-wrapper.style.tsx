import styled from 'styled-components';
import { cssVar, hideScrollbar } from '@branch-services/utils';

export const WidgetWrapper = styled.div`
  max-width: 150rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  background-color: ${(props) => props.theme.surface};
  border-radius: var(${cssVar.radius});
  //gap: 2.4rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.2rem 3.2rem 1.2rem 3.2rem;
  color: ${(props) => props.theme.textPrimary};
  /* background-color: ${(props) => props.theme.surface}; */
  /* min-height: 8rem; */
  //box-shadow: 0 -1px 1px 0 rgba(0, 0, 0, 0.16);
  gap: 0.4rem;
`;

export const HeaderTitleContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 0.4rem;
  flex-direction: column;
  justify-content: flex-start;
  /* align-items: center; */
  // padding: 1.3rem;
  color: ${(props) => props.theme.textPrimary};
  border-bottom: 1px solid ${(props) => props.theme.borderUser};
  padding-bottom: 0.8rem;

  strong {
    font-size: 1.8rem;
  }

  .header-title__devider {
    padding-inline: 0.8rem;
  }
  /* background-color: ${(props) => props.theme.surface}; */
  // min-height: 8rem;
  // border-radius: 0.4rem;
`;

export const HeaderTitleRow = styled.div`
  width: 100%;
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
`;

export const HeaderTitleGroup = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 0.8rem;
`;

export const HeaderAction = styled.div`
  position: absolute;
  inset-inline-end: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const HeaderIcon = styled.div`
  display: flex;
  align-items: center;

  svg,
  i {
    font-size: 2.2rem;
  }
`;

export const HeaderTitle = styled.span<{ $lastTitle: boolean }>`
  font-size: 1.2rem;
  /* color: ${(p) => (p.$lastTitle ? p.theme.textPrimary : p.theme.textTerritory)}; */
  color: ${(p) => p.theme.textSecondary};
`;

export const HeaderMessage = styled.p`
  width: 100%;
  font-size: 1.4rem;
  font-weight: normal;
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
  line-height: 1.5;
  // margin-left: 4.7rem;
`;

export const Icon = styled.i`
  font-size: 1.8rem;
  color: ${(props) => props.theme.textTerritory};
  margin: 0 0.4rem;
`;

export const BodyContainer = styled.div<{ $padding; overflow_x }>`
  width: 100%;
  /* min-height: 30rem; */
  //padding: ${(props) => props.$padding};
  /* background-color: ${(props) => props.theme.surface}; */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-x: ${(props) => props.overflow_x};
  /* footer {
    background-color: green;
    margin: 0 -3rem;
  }*/

  // border: 1px solid ${(props) => props.theme.border}; //#dbdee1; //fixme: get it's color fr
  /* border-radius: var(${cssVar.radius}); */

  ${hideScrollbar()}
`;

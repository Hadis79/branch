import styled from 'styled-components';

export const BottomSheetWrapper = styled.div`
  position: absolute;
`;
export const Backdrop = styled.div<{ visible: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  z-index: 1000;
`;

export const Footer = styled.div`
  padding: 2rem 3rem 4rem;
  box-shadow: rgba(0, 0, 0, 0.26) 0px 0px 36px -25px;
`;

export const Container = styled.div<{ height: number; maxHeight: number; closing: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.surface};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-shadow: 0 -3px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: ${({ closing, height }) => (closing ? 0 : `${height}px`)};
  max-height: ${({ maxHeight }) => `${maxHeight}px`};
  transition: height 0.3s ease;
  overflow: hidden;
  z-index: 1000;
`;

export const DragContainer = styled.div`
  padding-block: 1rem 2rem;
`;
export const DragHandle = styled.div`
  height: 8px;
  width: 50px;
  border-radius: 12px;
  margin: 10px auto;
  background-color: #ccc;
  cursor: grab;
`;

export const Body = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 0 3rem 4rem;
`;

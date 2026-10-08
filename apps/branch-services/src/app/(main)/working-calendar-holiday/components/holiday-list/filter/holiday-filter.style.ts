import styled from 'styled-components';

// "Remove filters" and the filter toggle, sized to their content.
// `width: auto` overrides the fixed width the search container gives every button.
// The toggle is a borderless chip with a light background in the design.
export const FilterActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: auto !important;

  .ant-btn-link {
    padding: 0 0.8rem;
  }

  .ant-badge .ant-btn,
  .ant-badge .ant-btn:hover {
    width: 100%;
    border: none;
    box-shadow: none;
    color: ${(props) => props.theme.primary} !important;
    background-color: ${(props) => props.theme.primaryLight} !important;
  }
`;

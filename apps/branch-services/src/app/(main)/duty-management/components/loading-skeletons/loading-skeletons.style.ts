import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 1.6rem 2.4rem;
  border: 0.1rem solid ${(props) => props.theme.border};
  border-radius: 0.8rem;
`;

// Same columns as the affected units table: row number, name, code
export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 4rem repeat(2, minmax(0, 1fr));
  gap: 2.4rem;
  padding: 1.6rem;
  border-bottom: 0.1rem solid ${(props) => props.theme.border};
`;

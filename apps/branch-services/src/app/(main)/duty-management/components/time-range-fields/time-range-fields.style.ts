import styled from 'styled-components';

// Unframed: it sits in the add-slot modal under the calendar
export const Container = styled.div`
  width: 100%;
  min-width: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Title = styled.div`
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;
  text-align: start;
`;

export const Fields = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;

  @media (max-width: 48rem) {
    flex-direction: column;
  }
`;

export const Field = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;

  .ant-form-item {
    flex: 1;
    min-width: 0;
    margin-bottom: 0;
  }

  .ant-picker {
    width: 100%;
    height: 4rem;
    padding-inline: 1.2rem;
    border: 0;
    border-radius: 0.6rem;
    background-color: ${(props) => props.theme.backgroundLight};
    box-shadow: none;

    &:hover,
    &.ant-picker-focused {
      border-color: transparent;
      background-color: ${(props) => props.theme.backgroundLight};
      box-shadow: none;
    }

    .ant-picker-input {
      justify-content: center;

      input {
        color: ${(props) => props.theme.primary};
        text-align: center;
        cursor: pointer;

        &::placeholder {
          color: ${(props) => props.theme.primary};
          opacity: 1;
        }
      }
    }

    .ant-picker-clear {
      color: ${(props) => props.theme.textSecondary};
      font-size: 1.6rem;
    }

    .ant-picker-clear {
      background-color: ${(props) => props.theme.backgroundLight};
    }
  }

  @media (max-width: 48rem) {
    width: 100%;
  }
`;

export const RangeArrow = styled.i`
  flex: none;
  color: ${(props) => props.theme.textSecondary};
  font-size: 1.6rem;
  line-height: 4rem;

  @media (max-width: 48rem) {
    display: none;
  }
`;

export const Label = styled.span`
  flex: none;
  color: ${(props) => props.theme.textSecondary};
  font-size: 1.2rem;
  line-height: 4rem;
  white-space: nowrap;
`;

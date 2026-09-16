import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';

export const SearchItemsContainer = styled.div`
  // user input values
  --grid-layout-gap: 1.4rem;
  --grid-column-count: 4; /* This gets overridden by an inline style. */
  --grid-item--min-width: 12rem; /* This gets overridden by an inline style. */

  // calculated values
  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

  display: grid;
  //grid-template-columns: repeat(auto-fill, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr);
  grid-template-columns: repeat(var(--grid-column-count), 1fr);
  grid-column-gap: var(--grid-layout-gap);

  ${respondTo.down('lg')} {
    grid-template-columns: 1fr 1fr;
  }

  ${respondTo.down('md')} {
    padding: 0 2rem;
  }

  ${respondTo.down('xs')} {
    grid-template-columns: 1fr;
  }

  & .span-2,
  & .half-width {
    grid-column-end: span 2;

    ${respondTo.down('xs')} {
      grid-column-end: unset;
    }
  }

  & .span-2-grow,
  & .half-width-grow {
    grid-column-end: span 2;

    ${respondTo.down('lg')} {
      grid-column-end: unset;
    }

    ${respondTo.down('xs')} {
      grid-column-end: unset;
    }
  }

  & .span-4,
  & .full-width {
    grid-column-end: span 4;

    ${respondTo.down('lg')} {
      grid-column-end: span 2;
      //overflow: visible;
    }

    ${respondTo.down('xs')} {
      grid-column-end: unset;
    }
  }

  & .buttons-container.full-width,
  & .buttons-container.span-4 {
    margin-top: 0;
    justify-self: end;
  }

  & .flex-row {
    display: flex;
    gap: var(--grid-layout-gap);
  }

  & .buttons-container {
    align-self: center;
    /* margin-top: 0.4rem; */

    > * {
      width: 12rem;
      margin-right: var(--grid-layout-gap);
    }

    > *:last-child {
      margin-right: 0;
    }

    ${respondTo.down('lg')} {
      margin-top: 0;
      margin-bottom: 2rem;
      justify-self: end;
    }

    ${respondTo.down('md')} {
      font-size: 1.5rem;
      width: -webkit-fill-available;
      > * {
        width: -webkit-fill-available !important;
      }
    }
  }

  & .ant-picker {
    width: 100%;
  }

  & .ant-form-item {
    /* margin-bottom: 1.6rem; */

    ${respondTo.down('lg')} {
      margin-bottom: 1.8rem;
    }
  }

  & .ant-form-item .ant-form-item-label > label::after {
    //content: '';
    display: none;
  }

  & .ant-form-item .ant-form-item-label > label {
    white-space: nowrap;
    text-overflow: ellipsis;

    ${respondTo.down('xs')} {
      font-size: 1.5rem;
      white-space: normal !important;
    }
  }

  & .ant-form-item-label {
    padding-bottom: 0 !important;
  }
`;

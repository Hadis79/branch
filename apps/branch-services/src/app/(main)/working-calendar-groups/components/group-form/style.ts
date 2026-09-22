import { Tabs } from 'antd';
import styled from 'styled-components';
import { respondTo } from '@branch-services/utils';
import { MessageBox } from '@branch-services/ui-kit';

export const StyledTabs = styled(Tabs)`
  .ant-tabs-nav-list {
    width: 100%;
    display: grid !important;
    grid-template-columns: repeat(2, 1fr);
  }
  .ant-tabs-tab {
    text-align: center;
    display: block;
    margin: 0 !important;
  }
  .custom-tab-bar-extra-content {
    flex: 1; /* Make the extra content div take up the remaining space */
  }
  .ant-tabs-nav {
    margin-bottom: 2.4rem;
    ${respondTo.down('lg')} {
      margin: 0 0 4rem;
    }
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;

  .ant-btn {
    min-width: 12rem;
  }
`;

export const NameRow = styled.div`
  display: flex;
  /* flex: 1; */
  align-items: flex-start;
  gap: 0.8rem;
  font-size: 1.4rem;
  .group-name-input {
    /* flex: 1; */
    margin-bottom: 0;
    .ant-input-affix-wrapper {
      align-items: stretch;
      height: 4rem;
      padding: 0;
      border-color: ${(props) => props.theme.primary};
      overflow: hidden;
    }

    .ant-input-suffix {
      align-self: stretch;
      align-items: center;
      margin: 0;
      padding-inline: 1.2rem;
      background-color: ${(props) => props.theme.cardColor};

      .ri-check-line {
        display: flex;
        color: ${(props) => props.theme.primary};
        font-size: 1.6rem;
        cursor: pointer;
      }
    }
    .ant-input-suffix {
      margin-inline-start: 0.8rem;

      .ri-check-line {
        display: flex;
        color: ${(props) => props.theme.primary};
        font-size: 1.8rem;
        cursor: pointer;
      }
    }

    .ant-input-affix-wrapper {
      align-items: center;
      padding: 0 0 0 1.2rem;
      border-color: ${(props) => props.theme.primary};
    }

    .ant-input-suffix {
      margin-inline-start: 0.8rem;

      .ri-check-line {
        display: flex;
        color: ${(props) => props.theme.primary};
        font-size: 1.8rem;
        cursor: pointer;
      }
    }
  }

  .ant-btn-link {
    height: auto;
    padding: 0;
  }
`;

export const GroupName = styled.h3`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 3.2rem;
  color: ${(props) => props.theme.textPrimary};
`;

export const WarningBanner = styled.div`
  margin-bottom: 2.4rem;
`;

export const ManualEditHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2.4rem;
  margin-bottom: 1.6rem;

  .add-unit-field {
    width: 32rem;
    margin-bottom: 0;
  }
`;

export const UnitOptionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 0.4rem 0;
  color: ${(props) => props.theme.textPrimary};
`;

export const UnitsTableWrapper = styled.div`
  .ant-table-wrapper {
    padding: auto 0;
  }
  .new-unit-row > td {
    background-color: ${(props) => props.theme.primaryLight};
  }

  .remove-unit {
    color: ${(props) => props.theme.error};
  }
`;

export const NewUnitTag = styled.span`
  margin-inline-start: 0.8rem;
  padding: 0 0.8rem;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.textTerritory};
  background-color: ${(props) => props.theme.primary};
`;

export const SelectedOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

export const SelectedOption = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0 0.8rem;
  color: ${(props) => props.theme.textSecondary};
  background: ${(props) => props.theme.backgroundLight};
  border-radius: 0.8rem;

  button {
    display: inline-flex;
    padding: 0;
    color: inherit;
    background: transparent;
    border: 0;
    cursor: pointer;
  }
`;

// The guide banner is neutral gray in the design, not the blue of an info alert
export const GuideMessageBox = styled(MessageBox)`
  background-color: ${(props) => props.theme.backgroundLight};
  border-color: ${(props) => props.theme.border};

  .ant-alert-icon,
  .ant-alert-close-icon {
    color: ${(props) => props.theme.textPrimary};
  }
`;

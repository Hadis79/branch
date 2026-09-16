import React from 'react';
import Image from 'next/image';
import { List, Radio, PaginationProps } from 'antd';

import { Avatar } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import companyAvatar from '../../../assets/media/company_avatar.png';

type OrganizationListProps = {
  data: any;
  loading: boolean;
  paginationInfo: any;
  selectedOrganization: any;
  setSelectedOrganization: React.Dispatch<any>;
  onPaginationUpdate: (page: number, pageSize: number) => void;
};

const OrganizationList = (props: OrganizationListProps) => {
  const { data, loading, paginationInfo, onPaginationUpdate, selectedOrganization, setSelectedOrganization } = props;

  const [t] = useTr();

  const renderItem = (item, index) => {
    const checked = selectedOrganization.organizationId === item.organizationId;

    return <ListItem item={item} checked={checked} onChange={(item) => setSelectedOrganization(item)} />;
  };

  const getPagination = (): PaginationProps => ({
    onChange: onPaginationUpdate,
    showTotal: (total, range) => `${range[0]}-${range[1]} ${t('common.of')} ${total}`,
    pageSize: paginationInfo.limit,
    current: paginationInfo.current,
    total: paginationInfo.total,
    size: 'small',
    responsive: true,
    showSizeChanger: false,
    hideOnSinglePage: true,
    // showQuickJumper:true
  });

  return (
    <List
      itemLayout='vertical'
      size='small'
      loading={loading}
      dataSource={data?.content}
      pagination={getPagination()}
      renderItem={renderItem}
    />
  );
};

const ListItem = React.memo(({ item, checked, onChange }: any) => {
  function getAvatar() {
    return <Avatar src={<Image src={item.logo ?? companyAvatar} alt={'company avatar'} />} size={40} />;
  }

  function getTitle() {
    //get title from locale
    return item.nameFa;
  }

  return (
    <List.Item
      key={item.organizationId}
      extra={<Radio checked={checked} onChange={() => onChange(item)} />}
      onClick={() => onChange(item)}
    >
      <List.Item.Meta avatar={getAvatar()} title={getTitle()} description={item.ssn} />
    </List.Item>
  );
});

export default OrganizationList;

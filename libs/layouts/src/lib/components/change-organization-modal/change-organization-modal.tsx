import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

import { useTr } from '@branch-services/translation';

import OrganizationList from './organization-list/organization-list';
import { Api } from '../../services';

import * as S from './change-organization-modal.style';

type Props = {
  open: boolean;
  userOrganizationData: any;
  onCancel: () => void;
  onConfirm: () => void;
};

const defaultPaginationInfo = {
  limit: 5,
  offset: 0,
  current: 1,
  total: 0,
};
const ChangeOrganizationModal = (props: Props) => {
  const { open, userOrganizationData, onCancel, onConfirm } = props;
  const API_STOP_TYPING_SEARCH_DELAY = 500; // 500 ms

  const [t] = useTr();
  const [selectedOrganization, setSelectedOrganization] = useState<any>(userOrganizationData?.currentOrganization);
  const [data, setData] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [paginationInfo, setPaginationInfo] = useState(defaultPaginationInfo);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length === 0) return;
    const timerId = setTimeout(async () => {
      // searching(searchTerm);
      await fetchData();
    }, API_STOP_TYPING_SEARCH_DELAY);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  const handleOk = async () => {
    const ok = await changeOrg(selectedOrganization.organizationId);
    if (ok) {
      onConfirm();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // setData([]);
  };

  const getSearchQuery = () => {
    let name: string | null = null;
    let ssn: string | null = null;

    if (searchQuery && searchQuery !== '') {
      if (isNaN(parseInt(searchQuery))) {
        name = searchQuery;
      } else {
        ssn = searchQuery;
      }
    }

    return { name, ssn };
  };
  const fetchData = async (offset = 0) => {
    try {
      const params = {
        limit: paginationInfo.limit,
        offset: offset /*paginationInfo.offset*/,
        nameFa: getSearchQuery().name,
        ssn: getSearchQuery().ssn,
      };

      setLoading(true);
      //TODO
      const response = await Api.getUserOrg(params);
      // const json = await response.json();
      // setData(response?.organizations);
      // setPaginationInfo({ ...paginationInfo, total: response?.organizations?.totalElements });
      // setPaginationInfo((prevState) => ({
      //   ...prevState,
      //   current: response?.organizations?.totalElements !== prevState.total ? 1 : prevState.current,
      //   total: response?.organizations?.totalElements,
      // }));
    } catch (error) {
      console.error(error);
    } finally {
      //remove
      setLoading(false);
    }
  };

  const changeOrg = async (orgId): Promise<boolean> => {
    let result = false;
    try {
      setLoading(true);
      const response = await Api.changeOrg(orgId);
      // console.log('res', response);
      result = true;
    } catch (error) {
      console.error(error);
    } finally {
      //remove
      setLoading(false);
    }

    return result;
  };

  const handlePaginationUpdate = (page: number, pageSize: number) => {
    setPaginationInfo((prevState) => ({
      ...prevState,
      current: page,
      offset: (page - 1) * (pageSize ?? prevState.limit),
    }));

    const offset = (page - 1) * pageSize;
    fetchData(offset);
  };

  return (
    <S.ModalWrapper
      title={t('layout.change_org_title')}
      open={open}
      centered
      // confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
      okText={t('button.make_change')}
      cancelText={t('button.cancel')}
      // footer={null}
      keyboard={true}
      // getContainer={'div'}
    >
      <Input
        className='change-org-search-input'
        placeholder={t('layout.change_org_search_placeholder').toString()}
        value={searchQuery}
        onChange={handleSearch}
        prefix={<i className={'ri-search-line'} />}
      />

      <p className='org-list-title'>{t('layout.org_list_title')}</p>

      <div className={'org-list-container'}>
        <OrganizationList
          data={data}
          onPaginationUpdate={handlePaginationUpdate}
          paginationInfo={paginationInfo}
          loading={loading}
          selectedOrganization={selectedOrganization}
          setSelectedOrganization={setSelectedOrganization}
        />
      </div>
    </S.ModalWrapper>
  );
};

export default ChangeOrganizationModal;

import { Box, Button, FilterButton, Input, Select } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';
import { Form } from 'antd';
import * as S from '../filter/filter.style';
import React, { Fragment, useMemo, useState } from 'react';
import { isEmptyObjectValues, resetFormExcept } from '@branch-services/utils';
import { FORM_ITEM_NAMES, getTransactionTypeOptions, mainInputNames } from '../../utils/consts';
import usePurposesQuery from '../../queries/use-get-purposes-query';
import { CustomMessageBox } from './filter.style';
import useHistoryQuery from '../../queries/use-history-query';
import useNewRequestsWidgetStore from '../../store/use-widget-store';
import { RequestTypes } from '../../utils/enums';

export const Filter = () => {
  const [t] = useTr();
  const [form] = Form.useForm();
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const transactionTypeOptions = useMemo(() => getTransactionTypeOptions(t), [t]);
  const { setFilter, filter, resetPagination } = useNewRequestsWidgetStore();

  const { data: statePurposes, isLoading: purposesLoading } = usePurposesQuery();
  // const { data: stateStatuses, isLoading: statusesLoading } = useGetStatusesQuery();
  const { refetch, isFetching } = useHistoryQuery();

  const handleClickFilter = () => {
    setIsFilterActive(!isFilterActive);
  };

  const removeFilterItem = () => {
    resetFormExcept(form, FORM_ITEM_NAMES, mainInputNames);
  };
  const onFinish = async (values) => {
    resetPagination();
    await setFilter(values);
    refetch();
  };

  const isFilterFilled = () => {
    return !isEmptyObjectValues(filter, mainInputNames);
  };

  const requestTypeOptions = [
    {
      value: RequestTypes.ONLINE,
      label: t('online_bulk_deposit'),
    },
    {
      value: RequestTypes.OFFLINE_ACH,
      label: t('offline_ach_bulk_deposit'),
    },
    {
      value: RequestTypes.OFFLINE_SALARY,
      label: t('offline_salary_bulk_deposit'),
    },
  ];
  return (
    <Fragment>
      <CustomMessageBox message={t('message_info')} shouldScroll />

      <Form form={form} onFinish={onFinish} layout='vertical'>
        <S.Search>
          <Form.Item layout='vertical' label={t('trace_number')} name={FORM_ITEM_NAMES.traceCode}>
            <Input placeholder={t('enter_trace_number')} />
          </Form.Item>

          <Box alignItems='center' justifyContent='space-between'>
            <Box marginTop={'0.6rem'}>
              <FilterButton
                showBadge={isFilterFilled()}
                size='large'
                width={0}
                onClick={handleClickFilter}
                active={isFilterActive}
              />
              <Button style={{ minWidth: '12rem' }} htmlType='submit' type='primary' size='large' loading={isFetching}>
                {t('search')}
              </Button>
            </Box>

            {isFilterActive && (
              <Box justifyContent='flex-end'>
                <Button className='remove-filter' type='text' color='primary' onClick={removeFilterItem}>
                  {t('remove_filter')}
                </Button>
              </Box>
            )}
          </Box>

          {isFilterActive && (
            <>
              <Form.Item label={t('legal_ssn')} name={FORM_ITEM_NAMES.ssn}>
                <Input allow='number' placeholder={t('enter_legal_ssn')} />
              </Form.Item>

              {/*<Form.Item label={t('status')} name={FORM_ITEM_NAMES.requestStatus}>*/}
              {/*  <Select*/}
              {/*    options={stateStatuses}*/}
              {/*    loading={statusesLoading}*/}
              {/*    defaultValue={t('all')}*/}
              {/*    allowClear*/}
              {/*    placeholder={t('all')}*/}
              {/*  />*/}
              {/*</Form.Item>*/}
              <Form.Item className={'half-width'} label={t('label.purpose')} name={FORM_ITEM_NAMES.purpose}>
                <Select
                  options={statePurposes}
                  allowClear
                  defaultValue={t('all')}
                  placeholder={t('all')}
                  loading={purposesLoading}
                />
              </Form.Item>
              <div className='filter-row'>
                <Form.Item className='full-width' label={t('deposit_amount')} name={FORM_ITEM_NAMES.fromAmount}>
                  <Input.Money placeholder={t('from_amount')} showLetter={false} />
                </Form.Item>

                <Form.Item className='full-width' label={t(' ')} name={FORM_ITEM_NAMES.toAmount}>
                  <Input.Money placeholder={t('to_amount')} showLetter={false} />
                </Form.Item>
              </div>
              <Form.Item name={FORM_ITEM_NAMES.accountNumber} label={t('origin_account_number')}>
                <Input maxLength={13} allow='number' allowClear placeholder={t('enter_accountNumber')} />
              </Form.Item>
              <Form.Item label={t('payment_type')} name={FORM_ITEM_NAMES.paymentType}>
                <Select options={transactionTypeOptions} defaultValue={t('all')} allowClear placeholder={t('all')} />
              </Form.Item>
              <Form.Item className='half-width' label={t('label.request_type')} name={FORM_ITEM_NAMES.requestType}>
                <Select options={requestTypeOptions} allowClear placeholder={t('all')} />
              </Form.Item>
            </>
          )}
        </S.Search>
      </Form>
    </Fragment>
  );
};

import React, { useState } from 'react';
import { useTr } from '@branch-services/translation';
import { Box, Button, FilterButton, Input, SearchItemsContainer, Select, SelectProps } from '@branch-services/ui-kit';
import { Form } from 'antd';
import useFilterQuery from '../../queries/use-filter-query';
import { isEmptyObjectValues, resetFormExcept } from '@branch-services/utils';
import { RequestTypes, TransactionType } from '../../../batch-ach-history/utils/consts';
import useOperationsDepartmentCartableStore from '../../store/use-widget-store';

const FORM_ITEM_NAMES = {
  accountNumber: 'accountNumber',
  traceCode: 'traceCode',
  fromAmount: 'fromAmount',
  toAmount: 'toAmount',
  paymentType: 'paymentType',
  ssn: 'ssn',
  branchCode: 'branchCode',
  requestType: 'requestType',
};

const mainInputNames = [FORM_ITEM_NAMES.traceCode];
const Filter = () => {
  const [form] = Form.useForm();
  const [t] = useTr();
  const { filter, setFilter, resetMessage } = useOperationsDepartmentCartableStore();
  const { isFetching, refetch } = useFilterQuery();

  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  // const { data: dataBankUnits, isFetching: getBankUnitsLoading } = useBankUnitsQuery();

  const onFinish = async (values: any) => {
    await setFilter(values);
    refetch();
  };

  const isFilterFilled = () => {
    return !isEmptyObjectValues(filter, mainInputNames);
  };

  const removeFilterItem = () => {
    resetFormExcept(form, FORM_ITEM_NAMES, mainInputNames);
  };
  const handleClickFilter = () => {
    setIsFilterActive(!isFilterActive);
  };
  const transactionTypeOptions: SelectProps['options'] = [
    { value: TransactionType.AUTO, label: t('auto') },
    { value: TransactionType.LOCAL, label: t('local') },
    { value: TransactionType.PAYA, label: t('paya') },
    { value: TransactionType.SATNA, label: t('satna') },
  ];

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
    <Form form={form} onFinish={onFinish} layout='vertical'>
      <SearchItemsContainer>
        <Form.Item className={'half-width'} layout='vertical' label={t('trace_code')} name={FORM_ITEM_NAMES.traceCode}>
          <Input placeholder={t('enter_trace_number')} />
        </Form.Item>

        {/* Date filtering is disabled for operations department Cartable.
        <Box className={'half-width'} display={'flex'} flexDirection={'column'}>
          <Form.Item
            label={t('register_date')}
            name={FORM_ITEM_NAMES.dateRangeType}
            initialValue={dateRangeOptions?.[4].value}
          >
            <Select onSelect={handleDateRangeChange} options={dateRangeOptions} />
          </Form.Item>

          <Box className={'flex-row'}>
            <Form.Item name={FORM_ITEM_NAMES.fromDate} hidden={dateRangeValue !== DateRangeID.CUSTOM}>
              <DatePicker defaultValue={initialValues.fromDate} allowClear={false} format={dateFormat} disableFuture />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.toDate} required={true} hidden={dateRangeValue !== DateRangeID.CUSTOM}>
              <DatePicker
                defaultValue={initialValues.toDate}
                allowClear={false}
                format={dateFormat}
                disabledDate={(current) => disableEndDate(current, form)}
              />
            </Form.Item>
          </Box>
        </Box> */}
        <Box alignItems='center' justifyContent='space-between'>
          <Box>
            <FilterButton
              size='large'
              width={0}
              onClick={handleClickFilter}
              active={isFilterActive}
              showBadge={isFilterFilled()}
            />
            <Button
              htmlType='submit'
              type='primary'
              loading={isFetching}
              onClick={() => {
                resetMessage();
              }}
              style={{ minWidth: '12rem' }}
            >
              {t('field.search')}
            </Button>
          </Box>

          {isFilterActive && (
            <Box>
              <Button type='link' color='primary' onClick={removeFilterItem}>
                {t('remove_filter')}
              </Button>
            </Box>
          )}
        </Box>

        {/*<Box gap={0} className={'full-width buttons-container'}>*/}
        {/*  {isFilterActive && (*/}
        {/*    <Box>*/}
        {/*      <Button type='link' color='primary' onClick={removeFilterItem}>*/}
        {/*        {t('remove_filter')}*/}
        {/*      </Button>*/}
        {/*    </Box>*/}
        {/*  )}*/}

        {/*  <FilterButton*/}
        {/*    size='large'*/}
        {/*    width={'12rem'}*/}
        {/*    onClick={handleClickFilter}*/}
        {/*    active={isFilterActive}*/}
        {/*    showBadge={isFilterFilled()}*/}
        {/*  />*/}
        {/*  <Button*/}
        {/*    htmlType='submit'*/}
        {/*    type='primary'*/}
        {/*    loading={isFetching}*/}
        {/*    onClick={() => {*/}
        {/*      resetMessage();*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    {t('field.search')}*/}
        {/*  </Button>*/}
        {/*</Box>*/}

        {isFilterActive && (
          <>
            <Form.Item className={'half-width'} name={FORM_ITEM_NAMES.ssn} label={t('legal_ssn')}>
              <Input allow='number' placeholder={t('enter_legal_ssn')} />
            </Form.Item>

            <Form.Item className={'half-width'} name={FORM_ITEM_NAMES.accountNumber} label={t('account_number')}>
              <Input maxLength={13} allow='number' allowClear placeholder={t('enter_accountNumber')} />
            </Form.Item>

            {/*<Form.Item className={'half-width'} label={t('transaction_type')} name={FORM_ITEM_NAMES.paymentType}>*/}
            {/*  <Select*/}
            {/*    options={transactionTypeOptions}*/}
            {/*    defaultValue={t('common.all')}*/}
            {/*    allowClear*/}
            {/*    placeholder={t('common.all')}*/}
            {/*  />*/}
            {/*</Form.Item>*/}
            <Form.Item className={'half-width'} name={FORM_ITEM_NAMES.branchCode} label={t('branch_code')}>
              <Input maxLength={30} allow='number' allowClear placeholder={t('enter_branch_code')} />
            </Form.Item>

            {/*<Form.Item className={'half-width'} label={t('branch_code')} name={FORM_ITEM_NAMES.branchCode}>*/}
            {/*  <Select*/}
            {/*    options={dataBankUnits}*/}
            {/*    defaultValue={t('all')}*/}
            {/*    allowClear*/}
            {/*    placeholder={t('all')}*/}
            {/*    loading={getBankUnitsLoading}*/}
            {/*  />*/}
            {/*</Form.Item>*/}
            <Form.Item className='half-width' label={t('label.request_type')} name={FORM_ITEM_NAMES.requestType}>
              <Select options={requestTypeOptions} allowClear placeholder={t('all')} />
            </Form.Item>
            <Form.Item label={t('deposit_amount')} name={FORM_ITEM_NAMES.fromAmount}>
              <Input.Money placeholder={t('from_amount')} showLetter={false} />
            </Form.Item>

            <Form.Item label={t(' ')} name={FORM_ITEM_NAMES.toAmount}>
              <Input.Money placeholder={t('to_amount')} showLetter={false} />
            </Form.Item>
          </>
        )}
      </SearchItemsContainer>
    </Form>
  );
};

export default Filter;

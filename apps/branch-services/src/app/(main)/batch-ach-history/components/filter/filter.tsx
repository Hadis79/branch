import {
  Box,
  Button,
  DatePicker,
  FilterButton,
  Input,
  SearchItemsContainer,
  Select,
  SelectProps,
} from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';
import { Form } from 'antd';
import React, { useMemo, useState } from 'react';
import { getDateRangeById, getDateRangeOptions, resetFormExcept } from '../../utils/utils';
import { DateRangeID, RequestTypes, TransactionType } from '../../utils/consts';
import useFilterQuery from '../../queries/use-filter-query';
import usePaymentStatus from '../../queries/use-payment-status';
import useBatchAchHistoryStore from '../../store/use-widget-store';
import { dayjs, isEmptyObjectValues } from '@branch-services/utils';
import { FilterParams, RequestStatus } from '../../utils/types';
import usePurposesQuery from '../../../new-requests/queries/use-get-purposes-query';

export const Filter = () => {
  const [t] = useTr();
  const [form] = Form.useForm();
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const { applyFilter, filter, resetMessage, resetDownloadErrorMessage } = useBatchAchHistoryStore();
  const { isFetching } = useFilterQuery();
  const { data: dataStatus } = usePaymentStatus();
  const { data: statePurposes, isLoading: purposesLoading } = usePurposesQuery();

  const FORM_ITEM_NAMES = {
    accountNumber: 'accountNumber',
    requestStatus: 'requestStatus',
    fromDate: 'fromDate',
    toDate: 'toDate',
    fromAmount: 'fromAmount',
    toAmount: 'toAmount',
    paymentType: 'paymentType',
    traceCode: 'traceCode',
    dateRangeType: 'dateRangeType',
    purpose: 'purpose',
    requestType: 'requestType',
  };
  const dateFormat = 'YYYY/MM/DD';
  const dateRangeValue = Form.useWatch(FORM_ITEM_NAMES.dateRangeType, { form, preserve: true }) ?? DateRangeID.LAST1M;

  const mainInputNames = [
    FORM_ITEM_NAMES.traceCode,
    FORM_ITEM_NAMES.fromDate,
    FORM_ITEM_NAMES.toDate,
    FORM_ITEM_NAMES.dateRangeType,
  ];
  const initialValues: any = {};
  const dateRangeOptions = useMemo(() => getDateRangeOptions(t), [t]);

  const handleDateRangeChange = (value: DateRangeID) => {
    const { fromDate, toDate } = getDateRangeById(value);
    form.setFieldsValue({
      [FORM_ITEM_NAMES.fromDate]: fromDate,
      [FORM_ITEM_NAMES.toDate]: toDate,
    });
  };

  const transactionTypeOptions: SelectProps['options'] = [
    { value: TransactionType.ALL, label: t('common.all') },
    { value: TransactionType.AUTO, label: t('auto') },
    { value: TransactionType.LOCAL, label: t('local') },
    { value: TransactionType.PAYA, label: t('paya') },
    { value: TransactionType.SATNA, label: t('satna') },
  ];
  const getPaymentStatusTitles = (dataStatus: RequestStatus[]) => {
    const newDataValues = new Set();
    return dataStatus
      ?.filter((item) => !newDataValues?.has(item.value) && newDataValues.add(item.value))
      ?.map((item) => ({ value: item.value, label: item.title }));
  };

  const handleClickFilter = () => {
    setIsFilterActive(!isFilterActive);
  };

  const removeFilterItem = () => {
    resetFormExcept(form, FORM_ITEM_NAMES, mainInputNames);
  };
  const onFinish = (values: FilterParams) => {
    const { fromDate, toDate, ...res } = values;
    if (!fromDate && !toDate) {
      const defaultDateRange = getDateRangeById(dateRangeValue);
      applyFilter({ ...defaultDateRange, ...res });
    } else {
      applyFilter(values);
    }
  };

  const isFilterFilled = () => {
    return !isEmptyObjectValues(filter, mainInputNames);
  };

  const disableEndDate = (current, form) => {
    const fromDate = form.getFieldValue(FORM_ITEM_NAMES.fromDate);
    return current && (current > dayjs().endOf('day') || (fromDate && current.isBefore(fromDate, 'day')));
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
    <div
      style={{
        padding: '2.4rem 3.2rem',
      }}
    >
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <SearchItemsContainer>
          <Form.Item
            className={'half-width'}
            layout='vertical'
            label={t('trace_code')}
            name={FORM_ITEM_NAMES.traceCode}
          >
            <Input placeholder={t('enter_trace_number')} />
          </Form.Item>

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
                <DatePicker
                  defaultValue={initialValues.fromDate}
                  allowClear={false}
                  format={dateFormat}
                  disableFuture
                />
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
          </Box>

          <Box gap={0} className={'full-width buttons-container'}>
            {isFilterActive && (
              <Box>
                <Button type='link' color='primary' onClick={removeFilterItem}>
                  {t('remove_filter')}
                </Button>
              </Box>
            )}
            <FilterButton
              size='large'
              width={'12rem'}
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
                resetDownloadErrorMessage();
              }}
            >
              {t('search')}
            </Button>
          </Box>

          {isFilterActive && (
            <>
              <Form.Item className={'half-width'} name={FORM_ITEM_NAMES.accountNumber} label={t('accountNumber')}>
                <Input maxLength={13} allow='number' allowClear placeholder={t('enter_accountNumber')} />
              </Form.Item>

              <Form.Item className='half-width' label={t('label.request_type')} name={FORM_ITEM_NAMES.requestType}>
                <Select options={requestTypeOptions} allowClear placeholder={t('all')} />
              </Form.Item>
              <Form.Item className={'half-width'} label={t('status')} name={FORM_ITEM_NAMES.requestStatus}>
                <Select
                  options={getPaymentStatusTitles(dataStatus)}
                  defaultValue={t('all')}
                  allowClear
                  placeholder={t('all')}
                />
              </Form.Item>
              <Form.Item className={'half-width'} label={t('transaction_type')} name={FORM_ITEM_NAMES.paymentType}>
                <Select options={transactionTypeOptions} defaultValue={t('all')} allowClear placeholder={t('all')} />
              </Form.Item>
              <Form.Item className={'half-width'} label={t('label.purpose')} name={FORM_ITEM_NAMES.purpose}>
                <Select
                  options={statePurposes}
                  allowClear
                  defaultValue={t('all')}
                  placeholder={t('all')}
                  loading={purposesLoading}
                />
              </Form.Item>
              <Form.Item label={`${t('deposit_amount')}`} name={FORM_ITEM_NAMES.fromAmount}>
                <Input.Money placeholder={t('from_amount')} showLetter={false} />
              </Form.Item>

              <Form.Item label={t(' ')} name={FORM_ITEM_NAMES.toAmount}>
                <Input.Money placeholder={t('to_amount')} showLetter={false} />
              </Form.Item>
            </>
          )}
        </SearchItemsContainer>
      </Form>
    </div>
  );
};

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
import { useEffect, useMemo, useState } from 'react';
import { getDateRangeById, getDateRangeOptions, resetFormExcept } from '../../utils/utils';
import { DateRangeID, DepositType, RequestType, TransactionType } from '../../utils/consts';
import useFilterQuery from '../../queries/use-filter-query';
import usePaymentStatus from '../../queries/use-payment-status';
import useListRequestStore from '../../store/use-widget-store';
import { dayjs, isEmptyObjectValues } from '@branch-services/utils';
import { FilterParams, RequestStatus } from '../../utils/types';
import usePurposesQuery from '../../queries/use-get-purposes-query';
import { useResponsive } from '@branch-services/hooks';

export const Filter = () => {
  const [t] = useTr();
  const [form] = Form.useForm();
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const { setFilter, filter, resetMessage, resetDownloadErrorMessage, purposes } = useListRequestStore();
  const { isFetching, refetch } = useFilterQuery();
  const { data: dataStatus } = usePaymentStatus();
  const { data: dataPurpose, isLoading: purposesLoading } = usePurposesQuery();

  const FORM_ITEM_NAMES = {
    accountNumber: 'accountNumber',
    requestStatus: 'requestStatus',
    deposit_id: 'deposit_id',
    userSSN: 'userSSN',
    fromAmount: 'fromAmount',
    toAmount: 'toAmount',
    paymentType: 'paymentType',
    traceCode: 'traceCode',
    count: 'count',
    purpose: 'purpose',
    toDate: 'toDate',
    fromDate: 'fromDate',
    dateRangeType: 'dateRangeType',
    requestType: 'requestType',
    depositType: 'depositType',
  };

  const mainInputNames = [FORM_ITEM_NAMES.accountNumber];
  const initialValues: any = {};
  const dateRangeOptions = useMemo(() => getDateRangeOptions(t), [t]);
  const { isMobileOrTablet } = useResponsive();

  const dateFormat = 'YYYY/MM/DD';
  const dateRangeValue = Form.useWatch(FORM_ITEM_NAMES.dateRangeType, { form, preserve: true }) ?? DateRangeID.LAST1M;

  useEffect(() => {
    const { fromDate, toDate } = getDateRangeById(dateRangeValue);

    setFilter({ fromDate, toDate });
  }, [dateRangeValue]);

  const transactionTypeOptions: SelectProps['options'] = [
    { value: TransactionType.ALL, label: t('common.all') },
    { value: TransactionType.AUTO, label: t('auto') },
    { value: TransactionType.LOCAL, label: t('local') },
    { value: TransactionType.PAYA, label: t('paya') },
    { value: TransactionType.SATNA, label: t('satna') },
    { value: TransactionType.NONE, label: t('none') },
  ];

  const depositTypeOptions: SelectProps['options'] = [
    { value: DepositType.ALL, label: t('common.all') },
    { value: DepositType.ACCOUNT_WITHDRAWAL, label: t('label.account_withdrawal') },
    { value: DepositType.EXTERNAL_WITHDRAWAL, label: t('label.external_withdrawal') },
  ];

  const requestTypeOptions: SelectProps['options'] = [
    { value: RequestType.ALL, label: t('common.all') },
    { value: RequestType.ACH, label: t('label.offline_paya_batch_deposit') },
    { value: RequestType.ONLINE, label: t('label.online_batch_deposit') },
    { value: RequestType.OFFLINE, label: t('label.offline_batch_salary_deposit') },
  ];

  const getPaymentStatusTitles = (dataStatus: RequestStatus[]) => {
    const newDataValues = new Set();
    return dataStatus
      ?.filter((item) => !newDataValues?.has(item.code) && newDataValues.add(item.code))
      ?.map((item) => ({ value: item.code, label: item.persianTitle }));
  };

  const handleClickFilter = () => {
    setIsFilterActive(!isFilterActive);
  };

  const removeFilterItem = () => {
    resetFormExcept(form, FORM_ITEM_NAMES, mainInputNames);
  };
  const onFinish = async (values: FilterParams) => {
    await setFilter(values);
    refetch();
  };

  const isFilterFilled = () => {
    return !isEmptyObjectValues(filter, [FORM_ITEM_NAMES.accountNumber]);
  };

  const disableEndDate = (current, form) => {
    const fromDate = form.getFieldValue(FORM_ITEM_NAMES.fromDate);
    return current && (current > dayjs().endOf('day') || (fromDate && current.isBefore(fromDate, 'day')));
  };

  const handleDateRangeChange = (value: DateRangeID) => {
    const { fromDate, toDate } = getDateRangeById(value);
    form.setFieldsValue({
      [FORM_ITEM_NAMES.fromDate]: fromDate,
      [FORM_ITEM_NAMES.toDate]: toDate,
    });
  };

  const getPurposes = () => {
    const result: SelectProps['options'] = [];
    const data = dataPurpose ?? purposes;
    data?.map((item) => {
      return result.push({
        value: item?.statementCode?.toString().trim(),
        label: item?.titleFA?.toString().trim(),
      });
    });
    return result ?? [];
  };

  return (
    <div
      style={
        isMobileOrTablet
          ? { padding: '2rem 0' }
          : {
              padding: '2.4rem 3.2rem',
            }
      }
    >
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <SearchItemsContainer>
          <Form.Item className={'half-width'} name={FORM_ITEM_NAMES.accountNumber} label={t('accountNumber')}>
            <Input maxLength={13} allow='number' allowClear placeholder={t('enter_accountNumber')} />
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
              <Box justifyContent='flex-end'>
                <Button className='remove-filter' type='text' color='primary' onClick={removeFilterItem}>
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
              size='large'
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
              <Form.Item className={'half-width'} label={t('label.trace_code')} name={FORM_ITEM_NAMES.traceCode}>
                <Input placeholder={t('trace_filter')} />
              </Form.Item>
              <Form.Item className={'half-width'} label={t('status')} name={FORM_ITEM_NAMES.requestStatus}>
                <Select
                  options={getPaymentStatusTitles(dataStatus)}
                  defaultValue={t('all')}
                  allowClear
                  placeholder={t('all')}
                />
              </Form.Item>

              {/* <Form.Item className={'half-width'} label={t('transaction_type')} name={FORM_ITEM_NAMES.paymentType}>
                <Select options={transactionTypeOptions} defaultValue={t('all')} allowClear placeholder={t('all')} />
              </Form.Item> */}

              <Form.Item className={'half-width'} label={t('label.deposit_type')} name={FORM_ITEM_NAMES.depositType}>
                <Select options={depositTypeOptions} defaultValue={t('all')} allowClear placeholder={t('all')} />
              </Form.Item>

              <Form.Item className={'half-width'} label={t('label.request_type')} name={FORM_ITEM_NAMES.requestType}>
                <Select options={requestTypeOptions} defaultValue={t('all')} allowClear placeholder={t('all')} />
              </Form.Item>

              <Form.Item label={t('from_amount')} name={FORM_ITEM_NAMES.fromAmount}>
                <Input.Money placeholder={t('from_amount')} showLetter={false} />
              </Form.Item>

              <Form.Item label={t('to_amount')} name={FORM_ITEM_NAMES.toAmount}>
                <Input.Money placeholder={t('to_amount')} showLetter={false} />
              </Form.Item>
              <Form.Item className={'half-width'} label={t('label.purpose')} name={FORM_ITEM_NAMES.purpose}>
                <Select
                  options={getPurposes()}
                  allowClear
                  // onChange={handlePurposeChange}
                  placeholder={t('all')}
                  loading={purposesLoading}
                />
              </Form.Item>
              {/* <Form.Item className={'half-width'} label={t('label.national_id')} name={FORM_ITEM_NAMES.userSSN}>
                <Input placeholder={t('placeholder.national_id')} />
              </Form.Item> */}
            </>
          )}
        </SearchItemsContainer>
      </Form>
    </div>
  );
};

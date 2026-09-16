import { Form } from 'antd';

import * as S from './filter.style';
import { useTr } from '@branch-services/translation';
import { Box, Button, Input } from '@branch-services/ui-kit';
import useNewRequestsWidgetStore from '../../../../store/use-widget-store';
import useFileDetailsQuery from '../../../../queries/use-get-file-details-query';

export const FILTER_FORM_ITEMS = {
  destinationAccount: 'destinationAccount',
};

const Filter = () => {
  const [t] = useTr();
  const [form] = Form.useForm();

  const {
    fileDetailsFilter,
    setFileDetailsFilter,
    pagination: paginationInquiry,
    showFileDetailsTableAction,
    resetPagination,
    resetFileDetailsFilter,
  } = useNewRequestsWidgetStore((state) => state);

  const {
    refetch: refetchFileDetails,
    data: fileDetailsData,
    isFetching: fileDetailsIsFetching,
  } = useFileDetailsQuery();

  function getSearchButton() {
    return (
      <Button
        style={{ marginTop: '0.7rem' }}
        htmlType='submit'
        type='primary'
        size='large'
        loading={fileDetailsIsFetching}
      >
        {t('button.search')}
      </Button>
    );
  }

  const onFinish = async (values) => {
    resetPagination();
    setFileDetailsFilter(values);
    refetchFileDetails();
  };

  const handleBackClick = () => {
    showFileDetailsTableAction(false);
    resetPagination();
    resetFileDetailsFilter();
  };

  return (
    <S.FilterWrapper form={form} layout='vertical' onFinish={onFinish}>
      <div className='back-btn__box'>
        <Button type={'link'} onClick={handleBackClick}>
          <i className='ri-arrow-left-line' />
          {t('button.return')}
        </Button>
        <div className='back-icon' onClick={handleBackClick}>
          <i className='ri-arrow-left-line' />
        </div>
      </div>
      <div className='filter-form'>
        <Form.Item className='filter-label' name={FILTER_FORM_ITEMS.destinationAccount} label={t('filter_item_1')}>
          <Input allowClear placeholder={t('filter_item_place_holder_1')} />
        </Form.Item>
        <Box>{getSearchButton()}</Box>
      </div>
    </S.FilterWrapper>
  );
};

export default Filter;

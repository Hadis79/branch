import React, { useState } from 'react';
import { Button, Table } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';
import { DataType, TransactionModal } from '@branch-services/components';

import CartablModals from '../modals';
import { columns, mobileColumns } from './columns';
import useFilterQuery from '../../queries/use-filter-query';
import DataTableRowDetail from '../data-table-row-detail/data-table-row-detail';

import * as S from './data-table.style';
import useOperationsDepartmentCartableStore from '../../store/use-widget-store';

const DataTable = () => {
  const { data, isFetching } = useFilterQuery();
  const { transactionKeys } = useOperationsDepartmentCartableStore();
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [t] = useTr();

  return (
    <S.DataTableBoxWrapper>
      <Table
        loading={isFetching /*isLoading*/}
        dataSource={data}
        columns={columns({ t })}
        mobileColumns={mobileColumns({ t })}
        hasContainer={false}
        pagination={false}
        expandable={{
          expandedRowRender: (record, index, indent, expanded) => (
            <DataTableRowDetail
              data={record}
              featureTypes={record.featureType}
              expanded={expanded}
              setOpenTransactionModal={setOpenTransactionModal}
            />
          ),
        }}
        rowKey={'requestTracingCode'}
      />
      {openTransactionModal && (
        <TransactionModal
          dataType={DataType.TRANSACTION_KEYS}
          id={transactionKeys?.id as any}
          ssn={transactionKeys?.ssn as any}
          footer={() => {
            return (
              <S.ButtonWrapper>
                <Button type='primary' onClick={() => setOpenTransactionModal(false)}>
                  {t('close')}
                </Button>
              </S.ButtonWrapper>
            );
          }}
          open={openTransactionModal}
          title={t('upload_info_box_title')}
        />
      )}
    </S.DataTableBoxWrapper>
  );
};

export default DataTable;

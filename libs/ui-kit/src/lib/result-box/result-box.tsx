import { Fragment, ReactNode } from 'react';
import * as S from './result-box.style';

export interface ResultBoxItemType {
  type: 'header' | 'item';
  title: string;
  value?: string | ReactNode;
  line?: boolean;
  subValue?: string;
  displayValue?: boolean;
}

type ResultBoxProps = {
  result: ResultBoxItemType[];
  modalView?: boolean;
};

export const ResultBox = ({ result, modalView = false }: ResultBoxProps) => {
  return (
    <S.ResultBoxContainer modal_view={modalView}>
      {result?.map((item: ResultBoxItemType, index: number) => {
        const infoHeader =
          item.type === 'header' ? (
            <div className='info-header'>
              {item.title}
              {item.line ? (
                <div className='line'>
                  <span />
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : null;

        const infoItem = item.type.startsWith('item') ? (
          <>
            <span className='info-item__title'>{item.title}:</span>
            <span className='info-item__value'>
              {item.value}
              {/* {item.type === 'item2' && getDestinationAccountMoreInfo()}
                    {item.type === 'item3' && getTransferType()} */}
            </span>
          </>
        ) : null;

        return (
          <Fragment key={item.title + '-' + index}>
            {infoHeader}
            {infoItem}
          </Fragment>
        );
      })}
    </S.ResultBoxContainer>
  );
};

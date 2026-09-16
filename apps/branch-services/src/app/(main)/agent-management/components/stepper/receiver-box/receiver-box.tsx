import {
  DeleteButton,
  DeleteButtonWrapper,
  ItemWrapper,
  ReceiverBoxStyle,
  ReceiverBoxWrapper,
} from '../national-id-step/national-id.style';
import { dateLocale, getValueOrDash } from '@branch-services/utils';
import { useTr } from '@branch-services/translation';
import React, { useState } from 'react';
import RemoveModal from '../../modal/remove-modal/remove-modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ReactComponent as DeleteIcon } from '../../../assets/media/Icon-delete-button.svg';
import { Pagination as AntPagination } from 'antd';

function ReceiverBox({ data }) {
  const [t] = useTr();
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [current, setCurrent] = useState(1);

  const handleRemoveModal = (item) => {
    setSelectedAgent(item);
    setIsRemoveModalOpen(true);
  };

  const prepareData = (data: any[]) => {
    return data.map((item, index) => {
      const rowNumber = index + 1;
      return [
        {
          item: ` ${t('#')} ${rowNumber}  `,
          value: ``,
        },
        {
          item: ` ${t('compony_agent')}`,
          value: getValueOrDash(item.orgAgentName),
        },
        {
          item: ` ${t('compony_legal_ssn')}`,
          value: getValueOrDash(item.orgAgentSsn),
        },
        {
          item: t('submitter'),
          value: getValueOrDash(item.userName),
        },
        {
          item: t('branch'),
          value: getValueOrDash(`${item.branchName} - ${item.branchCode}`),
        },
        {
          item: t('register_date'),
          value: getValueOrDash(dateLocale(item.delegationDate)),
        },
      ];
    });
  };
  const renderContent = () => {
    return prepareData(data)?.map((box, index) => {
      return (
        <ItemWrapper key={index}>
          {box.map((field, i) => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }} key={i}>
              <span className='info-item__title'>{field.item}</span>
              <span className='info-item__value'>{field.value}</span>
            </div>
          ))}

          <DeleteButtonWrapper>
            <DeleteButton onClick={() => handleRemoveModal(data[index])}>
              <DeleteIcon />
              {t('remove_agent')}
            </DeleteButton>
          </DeleteButtonWrapper>
        </ItemWrapper>
      );
    });
  };
  const items = renderContent();

  const groupedSlides: any[] = [];
  for (let i = 0; i < items.length; i += 2) {
    groupedSlides.push(items.slice(i, i + 2));
  }
  const swiperRef = React.useRef<any>(null);

  const handlePageChange = (page: number) => {
    setCurrent(page);
    swiperRef.current?.slideTo(page - 1);
  };
  return (
    <>
      <ReceiverBoxWrapper>
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrent(swiper.activeIndex + 1)}
          spaceBetween={20}
          touchStartPreventDefault={false}
        >
          {groupedSlides.map((group, index) => (
            <SwiperSlide key={index}>
              <ReceiverBoxStyle>{group}</ReceiverBoxStyle>
            </SwiperSlide>
          ))}
        </Swiper>
        {groupedSlides.length > 1 && (
          <AntPagination
            current={current}
            total={groupedSlides.length}
            pageSize={1}
            onChange={handlePageChange}
            align='center'
            style={{ marginTop: '2rem' }}
          />
        )}
      </ReceiverBoxWrapper>
      <RemoveModal open={isRemoveModalOpen} setOpen={setIsRemoveModalOpen} data={selectedAgent} />
    </>
  );
}

export default ReceiverBox;

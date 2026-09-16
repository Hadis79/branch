import Filter from './filter/filter';

import * as S from './top-section.style';

const TopSection = ({ stateList }) => {
  return (
    <S.TopSectionWrapper>
      <Filter />
    </S.TopSectionWrapper>
  );
};

export default TopSection;

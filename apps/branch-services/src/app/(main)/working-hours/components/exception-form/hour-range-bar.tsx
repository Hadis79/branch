import * as S from './hour-range-bar.style';
import { getHourWindow, toMinutesOfDay, toPersianDigits } from '../../utils/utils';

type HourRangeBarProps = {
  from: string;
  to: string;
};

// A track spanning the active hours (plus a little context after them), with those hours highlighted
const HourRangeBar = ({ from, to }: HourRangeBarProps) => {
  const hours = getHourWindow(from, to);
  const windowStart = hours[0] * 60;
  const windowEnd = (hours[hours.length - 1] + 1) * 60;
  const windowMinutes = windowEnd - windowStart;
  const left = ((toMinutesOfDay(from) - windowStart) / windowMinutes) * 100;
  const width = ((toMinutesOfDay(to) - toMinutesOfDay(from)) / windowMinutes) * 100;

  return (
    <S.Wrapper>
      <S.Track>
        <S.Range style={{ left: `${left}%`, width: `${width}%` }} />
      </S.Track>
      <S.Labels>
        {hours.map((hour) => (
          <S.Label key={hour} style={{ left: `${((hour * 60 - windowStart) / windowMinutes) * 100}%` }}>
            {toPersianDigits(`${String(hour).padStart(2, '0')}:00`)}
          </S.Label>
        ))}
      </S.Labels>
    </S.Wrapper>
  );
};

export default HourRangeBar;

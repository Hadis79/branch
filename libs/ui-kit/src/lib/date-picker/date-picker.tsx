import React from 'react';
import styled from 'styled-components';
import { DatePicker as AntDatePicker, DatePickerProps as AntDatePickerProps } from 'antd';
import { dayjs } from '@branch-services/utils';
import { RangePickerProps } from 'antd/lib/date-picker';

export type DatePickerProps = AntDatePickerProps & {
  defaultValueStr?: string;
  disabledPast?: boolean;
  disableFuture?: boolean;
};

const StyledDatePicker = styled(({ ...props }) => <AntDatePicker {...props} />)<AntDatePickerProps>``;

const dateFormat = 'YYYY/MM/DD';

export const DatePicker = (props: DatePickerProps) => {
  const {
    defaultValue,
    defaultValueStr,
    format = dateFormat,
    disabledPast = false,
    disableFuture = false,
    disabledDate,
    ...rest
  } = props;
  const defVal = defaultValue ?? (defaultValueStr ? dayjs(defaultValueStr) : null);

  const handleDisableDate = (current, info) => {
    if (disabledPast) {
      return current && current < dayjs().subtract(1, 'day').endOf('day');
    }
    if (disableFuture) {
      return current && current > dayjs().endOf('day');
    }
    if (disabledDate) {
      return disabledDate(current, info);
    }

    return false;
  };

  return (
    <StyledDatePicker
      format={format}
      defaultValue={defVal as any}
      disabledDate={handleDisableDate as RangePickerProps['disabledDate']}
      {...rest}
    />
  );
};

DatePicker.RangePicker = AntDatePicker.RangePicker;
DatePicker.TimePicker = AntDatePicker.TimePicker;
DatePicker.YearPicker = AntDatePicker.YearPicker;
DatePicker.WeekPicker = AntDatePicker.WeekPicker;
DatePicker.MonthPicker = AntDatePicker.MonthPicker;
DatePicker.QuarterPicker = AntDatePicker.QuarterPicker;

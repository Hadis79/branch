import { applyUnitChanges, toGroupUnit } from './utils';
import type { GroupFormValues, GroupRequestDto, GroupUnit } from './types';

type GroupRequestOptions = {
  values: GroupFormValues;
  isFileEntry: boolean;
  uploadedUnits?: GroupUnit[];
  currentUnits?: GroupUnit[];
};

export const toGroupRequest = ({
  values,
  isFileEntry,
  uploadedUnits,
  currentUnits,
}: GroupRequestOptions): GroupRequestDto => ({
  name: values.name,
  units: isFileEntry
    ? uploadedUnits ?? currentUnits ?? []
    : currentUnits
    ? applyUnitChanges(
        currentUnits,
        (values.addedUnits ?? []).map(toGroupUnit),
        (values.removedUnits ?? []).map(({ code }) => code)
      )
    : (values.units ?? []).map(toGroupUnit),
});

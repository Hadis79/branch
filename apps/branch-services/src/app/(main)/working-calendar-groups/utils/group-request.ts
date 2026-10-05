import { applyUnitChanges, toGroupUnit } from './utils';
import type { GroupFormValues, GroupRequestDto, GroupType, GroupUnit } from './types';

type GroupRequestOptions = {
  values: GroupFormValues;
  // Create: the form's own selection. Edit: the group's existing (unchangeable) type.
  groupType: GroupType;
  isFileEntry: boolean;
  uploadedUnits?: GroupUnit[];
  currentUnits?: GroupUnit[];
};

export const toGroupRequest = ({
  values,
  groupType,
  isFileEntry,
  uploadedUnits,
  currentUnits,
}: GroupRequestOptions): GroupRequestDto => ({
  name: values.name,
  groupType,
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

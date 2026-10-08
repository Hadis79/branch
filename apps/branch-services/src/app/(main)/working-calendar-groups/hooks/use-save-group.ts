import { useState } from 'react';

import useCreateGroupsMutation from '../queries/use-create-group-mutation';
import useUpdateGroupMutation from '../queries/use-update-group-mutation';
import { fetchAllGroupUnits } from '../services/group-units';
import { toGroupRequest } from '../utils/group-request';
import type { GroupFormValues, GroupType, GroupUnit } from '../utils/types';

type SaveGroupParams = {
  values: GroupFormValues;
  // Create: the form's own selection. Edit: the group's existing (unchangeable) type.
  groupType: GroupType;
  target: { variant: 'create' } | { variant: 'edit'; id: string };
  isFileEntry: boolean;
  uploadedUnits?: GroupUnit[];
};

const useSaveGroup = () => {
  const createGroup = useCreateGroupsMutation();
  const updateGroup = useUpdateGroupMutation();
  const [isPreparing, setIsPreparing] = useState(false);
  const isSaving = isPreparing || createGroup.isPending || updateGroup.isPending;

  const save = async ({ values, groupType, target, isFileEntry, uploadedUnits }: SaveGroupParams) => {
    if (isSaving) return false;

    let currentUnits: GroupUnit[] | undefined;
    const shouldFetchCurrentUnits = target.variant === 'edit' && (!isFileEntry || uploadedUnits === undefined);

    if (shouldFetchCurrentUnits) {
      setIsPreparing(true);
      try {
        currentUnits = await fetchAllGroupUnits(target.id);
      } finally {
        setIsPreparing(false);
      }
    }

    const body = toGroupRequest({ values, groupType, isFileEntry, uploadedUnits, currentUnits });

    if (target.variant === 'edit') {
      await updateGroup.mutateAsync({ id: target.id, ...body });
      return true;
    }

    await createGroup.mutateAsync(body);
    return true;
  };

  return { save, isSaving };
};

export default useSaveGroup;

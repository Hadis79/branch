import { useRef, useState } from 'react';

import useCreateGroupsMutation from '../queries/use-create-group-mutation';
import useUpdateGroupMutation from '../queries/use-update-group-mutation';
import { fetchAllGroupUnits } from '../services/group-units';
import { toGroupRequest } from '../utils/group-request';
import type { GroupFormValues, GroupUnit } from '../utils/types';

type SaveGroupParams = {
  values: GroupFormValues;
  target: { variant: 'create' } | { variant: 'edit'; id: string };
  isFileEntry: boolean;
  uploadedUnits?: GroupUnit[];
};

const useSaveGroup = () => {
  const createGroup = useCreateGroupsMutation();
  const updateGroup = useUpdateGroupMutation();
  const pending = useRef(false);
  const [isSaving, setIsSaving] = useState(false);

  const save = async ({ values, target, isFileEntry, uploadedUnits }: SaveGroupParams) => {
    if (pending.current) return false;
    pending.current = true;
    setIsSaving(true);
    try {
      const currentUnits =
        target.variant === 'edit' && (!isFileEntry || uploadedUnits === undefined)
          ? await fetchAllGroupUnits(target.id)
          : undefined;
      const body = toGroupRequest({ values, isFileEntry, uploadedUnits, currentUnits });
      if (target.variant === 'edit') await updateGroup.mutateAsync({ id: target.id, ...body });
      else await createGroup.mutateAsync(body);
      return true;
    } finally {
      pending.current = false;
      setIsSaving(false);
    }
  };

  return { save, isSaving };
};

export default useSaveGroup;

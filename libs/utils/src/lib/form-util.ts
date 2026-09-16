import { FormInstance } from 'antd/es/form/hooks/useForm';
import { Obj } from '@branch-services/types';

export function isEmptyObjectValues(obj: Record<string, unknown>, ignoreKeys?: string[], defaults?: Obj) {
  for (const prop in obj) {
    if (!ignoreKeys?.includes(prop)) {
      // Check if the property exists in the defaults object
      if (defaults && prop in defaults) {
        // If the property value matches the default value, ignore it
        if (obj[prop] === defaults[prop]) continue;
      }

      // Check if the property value is empty
      if (obj[prop] !== null && obj[prop] !== undefined && obj[prop] !== '') {
        return false;
      }
    }
  }
  return true;
}

export function resetFormExcept(form: FormInstance<any>, formItems: Obj, inputsNames: string[]) {
  const allNames = Object.keys(formItems);
  const namesToReset = allNames.filter((name) => !inputsNames.includes(name));
  form.resetFields(namesToReset);
}

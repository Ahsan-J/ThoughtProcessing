import { ObjectType } from "@/core/types/collection.types";

export const triggerFormError = (form: HTMLFormElement | null, fields: Record<string, string>): void => {
  if (form) {
    Object.keys(fields).forEach((key: string) => {
      const message = fields[key];
      const errorEvent = new CustomEvent('field-error', { detail: { error: message } })
      form.querySelector(`[data-name=${key}]`)?.dispatchEvent(errorEvent);
    })
  }
}

export const unmarshalFormData = function (formData: FormData): ObjectType {
  const obj: ObjectType = {};
  const processedKeys: string[] = [];

  const processValue = (
    temp: ObjectType,
    index: number,
    keys: (string | undefined)[],
    value: unknown,
    commonIndex: string | number = ""
  ): ObjectType => {
    const key = keys[index] || commonIndex;
    if (!temp[key]) temp[key] = {};

    if (index + 1 < keys.length) {
      return processValue(temp[key] as ObjectType, index + 1, keys, value, commonIndex);
    } else {
      temp[key] = value;
    }
    return temp;
  };

  for (const [key, value] of formData.entries() as IterableIterator<[string, string | number]>) {

    // Convert value into a number type if it matches the regex
    // if (/^[0-9]+$/.test(`${value?.toString()}`)) value = parseInt(value?.toString(), 10);

    const nestedKeys = key.match(/(?:\[([\w\d-_]*)\])/g)?.map(v => /\[(.*?)\]/g.exec(v)?.[1]);

    if (nestedKeys && nestedKeys.length > 1) {
      const parentKey = /([\w\d]+)/g.exec(key);
      if (parentKey) {
        if (!obj[parentKey[1]]) obj[parentKey[1]] = {};
        processValue(obj[parentKey[1]] as ObjectType, 0, nestedKeys, value, processedKeys.filter(v => v === key).length);
      }
    } else {
      const match = /\[([\w\d-_])*\]/.exec(key);
      if (match) {
        const [nestedKey, capturedNestedKey] = match;
        const parentKey = key.replace(nestedKey, "");
        if (obj[parentKey]) {
          if (Array.isArray(obj[parentKey])) {
            obj[parentKey].push(value);
          } else if (capturedNestedKey && !Array.isArray(obj[parentKey]) && typeof obj[parentKey] === "object") {
            (obj[parentKey] as ObjectType)[capturedNestedKey] = value;
          } else {
            obj[parentKey] = [obj[parentKey], value];
          }
        } else {
          if (!capturedNestedKey || /^[0-9]+$/.test(capturedNestedKey)) {
            obj[parentKey] = [value];
          } else {
            obj[parentKey] = { [capturedNestedKey]: value };
          }
        }
      } else {
        obj[key] = value;
      }
    }
    processedKeys.push(key);
  }

  return obj;
};

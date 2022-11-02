/* eslint-disable @typescript-eslint/no-explicit-any */

export const chunkArray = <T = any>(arr: Array<T> = [], size = 10): Array<Array<T>> => {
  const temporary = [];
  if(!size) return [arr];
  for (let i = 0, j = arr.length; i < j; i += size) {
    temporary.push(arr.slice(i, i + size));
  }
  return temporary;
}

export const range = (startIndex = 0, lastIndex = 0, step = 1): Array<number> => {
  if (typeof startIndex !== 'number' || startIndex < 0) return [];
  const arr = new Array(lastIndex && lastIndex > startIndex ? lastIndex : startIndex).fill(0).map((_, i) => i * step);
  if (startIndex && lastIndex) {
    return arr.filter(i => i >= startIndex)
  }
  return arr;
}

export const triggerFormError = (form: HTMLFormElement | null, fields: { [key in string]: string }): void => {
  if (form) {
    Object.keys(fields).forEach((key: string) => {
      const message = fields[key];
      const errorEvent = new CustomEvent('field-error', { detail: { error: message } })
      form.querySelector(`[data-name=${key}]`)?.dispatchEvent(errorEvent);
    })
  }
}

export const cleanObject = (obj: any = {}) => {
  if (!obj) { return {} }
  for (const key in obj) {
    if (!obj[key]) {
      delete obj[key];
    }
  }
  return obj;
}

export const mergeArrayByKey = (des: Array<any> = [], src: Array<any> = [], key = "id") => {
  const merged: Array<any> = Object.assign([], des)
  src.forEach(value => {
    const existingItem = merged.findIndex(e => e[key] == value[key]);
    if (existingItem != -1) {
      merged[existingItem] = Object.assign({}, {
        ...merged[existingItem],
        ...value,
      })
    } else {
      merged.push(value);
    }
  })
  return merged;
}

export const groupBy = <T = any>(xs: Array<T>, key: keyof T | ((item: T) => string)) => {
  return xs.reduce((rv: any, x: T) => {
    const indexingValue = typeof key == "function" ? key(x) : x[key];
    (rv[indexingValue] = rv[indexingValue] || []).push(x);
    return rv;
  }, {});
};

export const unmarshalFormData = function (formData: FormData) {
  const obj: any = {};
  const processedKeys: Array<string> = [];

  const processValue = (temp: any, index: number, keys: Array<string | undefined>, value: any, commonIndex: string | number = ""): any => {
    if (!temp[keys[index] || commonIndex]) temp[keys[index] || commonIndex] = {};
    if (index + 1 < keys.length) return processValue(temp[keys[index] || commonIndex], index + 1, keys, value, commonIndex)
    else temp[keys[index] || commonIndex] = value;
    return temp;
  }

  // eslint-disable-next-line prefer-const
  for (let [key, value] of formData.entries() as IterableIterator<[string, string | number]>) {

    // Convert value into a number type if passes regex
    if (/^[0-9]+$/.test(`${value?.toString()}`)) value = parseInt(value?.toString(), 10);
    const nestedKeys = key.match(/(?:\[([\w\d-_]*)\])/g)?.map(v => /\[(.*?)\]/g.exec(v)?.[1]);
    if (nestedKeys && nestedKeys.length > 1) {
      const parentKey = /([\w\d]+)/g.exec(key);
      if (parentKey) {
        if (!obj[parentKey[1]]) obj[parentKey[1]] = {};
        processValue(obj[parentKey[1]], 0, nestedKeys, value, processedKeys.filter(v => v == key).length)
      }
    } else {
      const match = /\[([\w\d-_])*\]/.exec(key)
      if (match) {
        const [nestedKey, capturedNestedKey] = match;
        const parentKey = key.replace(nestedKey, "");
        if (obj[parentKey]) {
          if (Array.isArray(obj[parentKey])) {
            obj[parentKey].push(value);
          } else if (capturedNestedKey && !Array.isArray(obj[parentKey]) && typeof obj[parentKey] == "object") {
            obj[parentKey][capturedNestedKey] = value;
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

export const isBrowser = () => typeof window !== 'undefined' && window.document !== undefined;
export const toKebabCase = (s: string) => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-')
export const toSnakeCase = (s: string) => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_')

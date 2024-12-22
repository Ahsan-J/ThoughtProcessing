import { ObjectType } from "@/core/types/collection.types";

export const chunkArray = <T>(arr: T[] = [], size = 10): T[][] => {
  const temporary = [];
  if(!size) return [arr];
  for (let i = 0, j = arr.length; i < j; i += size) {
    temporary.push(arr.slice(i, i + size));
  }
  return temporary;
}

export const range = (startIndex = 0, lastIndex = 0, step = 1): number[] => {
  if (typeof startIndex !== 'number' || startIndex < 0) return [];
  const arr = new Array(lastIndex && lastIndex > startIndex ? lastIndex : startIndex).fill(0).map((_, i) => i * step);
  if (startIndex && lastIndex) {
    return arr.filter(i => i >= startIndex)
  }
  return arr;
}

export const cleanObject = (obj: ObjectType = {}): ObjectType => {
  if (!obj) { return {} }
  for (const key in obj) {
    if (!obj[key]) {
      delete obj[key];
    }
  }
  return obj;
}

export const mergeArrayByKey = <T>(des: T[] = [], src: T[] = [], key: keyof T) => {
  const merged: T[] = Object.assign([], des)
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

export const groupBy = <T>(xs: T[], key: keyof T | ((item: T) => T[keyof T])): Record<string, T[]> => {
  return xs.reduce<Record<string, T[]>>((rv, x: T) => {
    const indexingValue = typeof key === 'function' ? key(x) : x[key];
    const indexKey = String(indexingValue);
    (rv[indexKey] = rv[indexKey] || []).push(x);
    return rv;
  }, {});
};

export const deepEquals = (object1: unknown, object2: unknown) => {

  const isObject = (v: unknown): v is object => !!v && typeof v === 'object';

  if ((typeof object1 == "string" || typeof object1 == "number") && (typeof object2 == "string" || typeof object2 == "number")) {
    return object1.toString().toLowerCase() == object2.toString().toLowerCase();
  }

  if (typeof object1 !== typeof object2) return false;

  if (typeof object1 == "boolean" && typeof object2 == "boolean") {
    return object1 == object2;
  }

  if (typeof object1 == "function" && typeof object2 == "function") {
    return object1.toString() == object2.toString();
  }

  const objKeys1 = isObject(object1) ? Object.keys(object1) : [];
  const objKeys2 = isObject(object2) ? Object.keys(object2) : [];

  if (objKeys1.length !== objKeys2.length) return false;

  for (const key of objKeys1) {
    const value1 = object1?.[key as keyof typeof object1];
    const value2 = object2?.[key as keyof typeof object2];

    if (!deepEquals(value1, value2)) return false;
  }

  return true;
}

export const isBrowser = () => typeof window !== 'undefined' && window.document !== undefined;
export const toKebabCase = (s: string) => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-')
export const toSnakeCase = (s: string) => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_')

import { ObjectType } from "@/core/types/collection.types";

export class JsonObject<T extends ObjectType<unknown>> {

  constructor(private json: T) {
    return this;
  }

  private getNestedKeys(key: string) {
    const keys = key.match(/(?:\[([\w\d-_@$]*)\])/g)?.map(v => /\[(.*?)\]/g.exec(v)?.[1]);
    return keys?.length ? keys : [];
  }

  private traverseData(data: unknown, key?: string, nestedKeys?: (string | undefined)[]): unknown {

    if (typeof data == "undefined" || data == null) return undefined;

    if (typeof data == "object" && key && key in data) {
      if (nestedKeys?.length) {
        return this.traverseData(data[key as keyof typeof data], nestedKeys[0], nestedKeys.slice(1, nestedKeys.length))
      }

      return data[key as keyof typeof data];
    }

    if (!key && typeof key === 'string' && Array.isArray(data)) {
      return data.map((value) => {
        if (nestedKeys?.length) {
          return this.traverseData(value, nestedKeys[0], nestedKeys.slice(1, nestedKeys.length))
        }
        return value;
      }).filter(v => v);
    }

    // case when data is array and gets out of bound
    if (key && /^[0-9]+$/.test(key) && Array.isArray(data) && !data[parseInt(`${key}`)]) {
      return undefined;
    }

    // case when key does not exist in result.
    if (key && typeof data == 'object' && !(key in data)) {
      return undefined
    }

    return data;
  }

  query(masterKey: string, obj: T = this.json!) {

    // case if key is not specified. return the unchanged object
    if (!masterKey) return obj;

    // case if key is able to query the object without modification. return the value at masterKey.
    if (obj && obj[masterKey] != undefined) return obj[masterKey]

    const nestedKeys = this.getNestedKeys(masterKey);

    const currentKeyMatches = /([\w\d-_@$]+)/g.exec(masterKey);

    const currentKey = currentKeyMatches?.[1];

    const values = this.traverseData(obj, currentKey, nestedKeys);

    // case when a single value is found
    if (Array.isArray(values) && values.length == 1) {
      return values[0];
    }

    // case when value is empty array
    if (Array.isArray(values) && values.length == 0) {
      return undefined;
    }

    return values;
  }
}

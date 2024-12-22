
import { ObjectType } from "@/core/types/collection.types";
import { ValidationData, ValidationKeys, ValidationResult } from "@/core/types/validation.types";
import { JsonObject } from "./json-query.util";

export class Validator<T extends ObjectType> {
  keys?: ValidationKeys<T>;

  constructor(keys: ValidationKeys<T>) {
    this.keys = keys;
    return this;
  }

  validate(data: T | ValidationData<T>, keys = this.keys): ValidationResult<T> {
    return Object.keys(keys || []).reduce<ValidationResult<T>>((result, key: keyof T) => {

      const validations = keys?.[key];

      const qb = new JsonObject(Object.assign({}, data));
      const value = qb.query(key.toString());

      // Case: If the value is an array of validation functions.
      if (Array.isArray(validations)) {

        for (const fn of validations) {
          if (typeof result == "object" && !result[key] && typeof fn == "function") {
            const validationMessage: string | boolean = fn(value, data);

            if (typeof validationMessage != "boolean") {
              result[key] = validationMessage;
            }
          }
        }
      }

      // Case: If validation data is a nested object instead of an array of validation functions.
      const children = data?.[key];
      if (children && typeof children == "object" && !Array.isArray(validations)) {
        result[key] = this.validate(children as never, validations as never);
      }

      if (!(key in result)) result[key] = true;

      return result;
    }, {});
  }

  assert<K extends keyof T>(key: K, value: T[K] extends ObjectType ? ValidationData<T[K]> : unknown) {
    const validations = this.keys?.[key];

    if (Array.isArray(validations)) {
      for (const fn of validations) {
        if (typeof fn == "function") {
          const validationMessage: string | boolean = fn(value);
          if (typeof validationMessage != "boolean") return validationMessage;
        }
      }
    }

    return true;
  }
}

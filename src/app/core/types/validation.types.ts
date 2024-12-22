import { ObjectType } from "./collection.types";

export type ValidationFunction<T = unknown> = (value: unknown, data?: T) => (string | boolean);
export type ValidationResult<T extends ObjectType> = { [K in keyof T]?: (string | boolean) | ValidationResult<T[K] & ObjectType> };
export type ValidationKeys<T = unknown> = { [K in keyof T]?: T[K] extends unknown[] ? ValidationFunction<T>[] : ValidationKeys<T[K]> }
export type ValidationData<T = unknown> = { [K in keyof T]?: T[K] extends ObjectType ? ValidationData<T[K]> : unknown}

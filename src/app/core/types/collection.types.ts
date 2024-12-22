export type Unit<T> = T extends (infer R)[] ? R : T;

export type EnumValue<T> = T extends Record<string | number | symbol, infer R> ? R : never

export type ObjectType<T = unknown> = Record<string | number | symbol, T>;

export type DeepPartial<T> = T extends ObjectType ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type Rename<T, K extends keyof T, N extends string> = Pick<T, Exclude<keyof T, K>> & Record<N, T[K]>
